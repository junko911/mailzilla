class Api::V1::WebhooksController < ApplicationController
  skip_before_action :authorized

  def create
    events = params["_json"]
    events.each do |event|
      next unless event["campaign_contact_id"]
      campaign_contact = CampaignContact.find(event["campaign_contact_id"])
      campaign_contact.update(status: event["event"])
    end
    head :ok
  end
end
