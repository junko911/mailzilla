class Api::V1::CampaignsController < ApplicationController
  before_action :find_campaign, only: [:update, :send_test]

  def index
    campaigns = Campaign.all
    render json: campaigns
  end

  def templates
    templates = [1, 2].map do |index|
      {
        template: File.read("public/templates/index_#{index}.html"),
        title: "Template #{index}",
        id: index
      }
    end

    render json: templates
  end

  def create
    campaign = Campaign.new(campaign_params)
    campaign.status = 0
    campaign.content = File.read("public/templates/index_#{campaign.template_id}.html")
    campaign.save
    render json: campaign
  end

  def update
    @campaign.update(campaign_params)
    render json: @campaign
  end

  def send_test
    @campaign.send_test
    render json: @campaign
  end
  
  private
  
  def campaign_params
    params.require(:campaign).permit!
  end
  
  def find_campaign
    @campaign = Campaign.find(params[:id])
  end
end
