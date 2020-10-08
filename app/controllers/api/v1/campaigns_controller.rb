class Api::V1::CampaignsController < ApplicationController
  def index
    campaigns = Campaign.all
    render json: campaigns
  end

  def templates
    templates = [0, 1].map do |index|
      {
        template: File.read("public/templates/index_#{index}.html"),
        title: "Index #{index}"
      }
    end

    render json: templates
  end

  def create
    campaign = Campaign.new(campaign_params)
    campaign.user = User.first
    campaign.segment = Segment.first
    campaign.from = User.first.email
    campaign.status = 0
    campaign.save
    render json: campaign
  end

  def send_test
    campaign = Campaign.find(params[:id])
    campaign.send_test
    render json: campaign
  end

  private

  def campaign_params
    params.require(:campaign).permit!
  end
end
