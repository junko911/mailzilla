class Campaign < ApplicationRecord
  enum status: %i(draft sending sent)

  belongs_to :user
  belongs_to :segment

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
