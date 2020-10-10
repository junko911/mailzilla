class Campaign < ApplicationRecord
  enum status: %i(draft sending sent)

  belongs_to :user
  belongs_to :segment

  def as_json(_options = nil)
    {
      id: id,
      name: name,
      status: status,
      created_at: created_at,
      subject: subject,
      from: from,
      content: content,
      segment: segment,
      template_id: template_id,
      user: user
    }
  end

  def send_test
    fromAddress = SendGrid::Email.new(email: from)
    body = SendGrid::Content.new(type: "text/html", value: content)
    sg = SendGrid::API.new(api_key: ENV["SENDGRID_API_KEY"])
    to = SendGrid::Email.new(email: user.email)
    mail = SendGrid::Mail.new(fromAddress, subject, to, body)
    sg.client.mail._("send").post(request_body: mail.to_json)
  end

  def send_to_segment
    fromAddress = SendGrid::Email.new(email: from)
    body = SendGrid::Content.new(type: "text/html", value: content)
    sg = SendGrid::API.new(api_key: ENV["SENDGRID_API_KEY"])

    segment.contacts.each { |contact|
      to = SendGrid::Email.new(email: contact.email)
      mail = SendGrid::Mail.new(fromAddress, subject, to, body)
      sg.client.mail._("send").post(request_body: mail.to_json)
    }

    update(status: :sent)
  end
end
