class Api::V1::CampaignsController < ApplicationController
  def index
    campaigns = Campaign.all
    render json: campaigns
  end

  def send_test
    campaign = Campaign.find(params[:id])
    campaign.send_test("junkotahara911@gmail.com")
    render json: campaign
  end
end
