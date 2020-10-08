class Campaign < ApplicationRecord
  enum status: %i(draft sending sent)
  
  belongs_to :user
  belongs_to :segment

  def send_test
    fromAddress = SendGrid::Email.new(email: from)
    to = SendGrid::Email.new(email: segment.contacts.first.email)
    body = SendGrid::Content.new(type: "text/html", value: content)
    mail = SendGrid::Mail.new(fromAddress, subject, to, body)
    sg = SendGrid::API.new(api_key: ENV["SENDGRID_API_KEY"])
    sg.client.mail._("send").post(request_body: mail.to_json)
  end
end
