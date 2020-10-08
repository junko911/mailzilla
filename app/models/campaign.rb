class Campaign < ApplicationRecord
  enum status: %i(draft sending sent)
  
  belongs_to :user
  belongs_to :segment

  def send_test(to_email)
    from = SendGrid::Email.new(email: user.email)
    to = SendGrid::Email.new(email: to_email)
    body = SendGrid::Content.new(type: "text/plain", value: content)
    mail = SendGrid::Mail.new(from, subject, to, body)
    sg = SendGrid::API.new(api_key: ENV["SENDGRID_API_KEY"])
    sg.client.mail._("send").post(request_body: mail.to_json)
  end
end
