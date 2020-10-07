# require 'sendgrid-ruby'
# include SendGrid

# from = Email.new(email: 'junkotahara911@gmail.com')
# to = Email.new(email: 'junkotahara911@gmail.com')
# subject = 'Sending with SendGrid is Fun'
# content = Content.new(type: 'text/plain', value: 'and easy to do anywhere, even with Ruby')
# mail = Mail.new(from, subject, to, content)

# sg = SendGrid::API.new(api_key: ENV['SENDGRID_API_KEY'])
# response = sg.client.mail._('send').post(request_body: mail.to_json)
# puts response.status_code
# puts response.body
# puts response.headers

require 'sendgrid-ruby'
include SendGrid

mail = Mail.new
mail.from = Email.new(email: 'junkotahara911@gmail.com')
personalization = Personalization.new
personalization.add_to(Email.new(email: 'junkotahara911@gmail.com'))
personalization.add_dynamic_template_data({
    "subject" => "Testing Templates",
    "name" => "Example User",
    "city" => "Denver"
  })
mail.add_personalization(personalization)
mail.template_id = 'd-778391741e744abe83240b1e2de306c8'

sg = SendGrid::API.new(api_key: ENV['SENDGRID_API_KEY'])
begin
    response = sg.client.mail._("send").post(request_body: mail.to_json)
rescue Exception => e
    puts e.message
end
puts response.status_code
puts response.body
puts response.parsed_body
puts response.headers
