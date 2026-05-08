class Campaign < ApplicationRecord
  SendGridDeliveryError = Class.new(StandardError)

  enum status: %i(draft sending sent)

  belongs_to :user
  has_many :campaign_contacts, dependent: :destroy
  belongs_to :segment

  validates :name, presence: true
  validates :segment, presence: true
  validates :subject, presence: true

  def as_json(_options = nil)
    sent = campaign_contacts.count
    delivered = campaign_contacts.where.not(delivered_at: nil).count
    delivered_rate = delivered / sent.to_f
    open = campaign_contacts.where.not(open_at: nil).count
    open_rate = open / delivered.to_f
    bounce = campaign_contacts.where(status: "bounce").count + campaign_contacts.where(status: "dropped").count
    bounce_rate = bounce / sent.to_f
    click = campaign_contacts.where.not(click_at: nil).count
    click_rate = click / delivered.to_f
    spamreport = campaign_contacts.where(status: "spamreport").count
    spamreport_rate = spamreport / delivered.to_f

    {
      id: id,
      name: name,
      status: status,
      created_at: created_at,
      sent_at: sent_at,
      subject: subject,
      from: from,
      content: content,
      segment: segment,
      num_of_contacts: segment.contacts.length,
      template_id: template_id,
      user: user,
      contacts: campaign_contacts.map { |campaign_contact|
        {
          contact: campaign_contact.contact,
          status: campaign_contact.status,
          created_at: campaign_contact.created_at,
          delivered_at: campaign_contact.delivered_at,
          open_at: campaign_contact.open_at,
          click_at: campaign_contact.click_at,
        }
      },
      sent: sent,
      delivered: delivered,
      delivered_rate: delivered_rate.round(4),
      open: open,
      open_rate: open_rate.round(4),
      click: click,
      click_rate: click_rate.round(4),
      bounce: bounce,
      bounce_rate: bounce_rate.round(4),
      spamreport: spamreport,
      spamreport_rate: spamreport_rate.round(4),
    }
  end

  def send_test(to_email:)
    fromAddress = SendGrid::Email.new(email: ENV["EMAIL_FROM"], name: user.name)
    body = SendGrid::Content.new(type: "text/html", value: content)
    to = SendGrid::Email.new(email: to_email)
    mail = SendGrid::Mail.new(fromAddress, subject, to, body)
    mail.reply_to = SendGrid::Email.new(email: from, name: user.name)
    post_sendgrid_mail(mail)
  end

  def send_to_segment
    return unless draft?

    fromAddress = SendGrid::Email.new(email: ENV["EMAIL_FROM"], name: user.name)

    segment.contacts.each do |contact|
      value = Mustache.render(content, name: contact.name)
      body = SendGrid::Content.new(type: "text/html", value: value)
      campaign_contact = campaign_contacts.create(contact: contact)
      to = SendGrid::Email.new(email: contact.email)
      mail = SendGrid::Mail.new(fromAddress, subject, to, body)
      mail.reply_to = SendGrid::Email.new(email: from, name: user.name)
      mail.add_custom_arg(SendGrid::CustomArg.new(key: "campaign_contact_id", value: campaign_contact.id))
      post_sendgrid_mail(mail)
    end

    update(status: :sent)
    update(sent_at: Time.current)
  end

  private

  def post_sendgrid_mail(mail)
    api_key = ENV["SENDGRID_API_KEY"].to_s.strip
    raise SendGridDeliveryError, "SENDGRID_API_KEY missing on server" if api_key.empty?

    if ENV["EMAIL_FROM"].to_s.strip.empty?
      raise SendGridDeliveryError, "EMAIL_FROM missing on server"
    end

    sg = SendGrid::API.new(api_key: api_key)
    response = sg.client.mail._("send").post(request_body: mail.to_json)
    code = response.status_code.to_i
    return if code >= 200 && code < 300

    Rails.logger.error("[SendGrid] send failed HTTP #{code} body=#{response.body}")
    raise SendGridDeliveryError, format_sendgrid_error_body(response.body)
  end

  def format_sendgrid_error_body(body)
    data = JSON.parse(body)
    errs = data["errors"]
    return body.to_s[0, 500] unless errs.is_a?(Array)

    errs.map { |e|
      e.is_a?(Hash) ? (e["message"].presence || e.inspect) : e.to_s
    }.compact.join("; ")
  rescue JSON::ParserError
    body.to_s[0, 500]
  end
end
