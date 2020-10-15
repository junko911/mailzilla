class Api::V1::WebhooksController < ApplicationController
  skip_before_action :authorized

  def create
    debugger
    events = params["_json"]
    events.each do |event|
      next unless event["id"]
      message = Message.find(event["id"])
      message.update_attribute(:status, event["event"])
    end
    head :ok
  end
end
