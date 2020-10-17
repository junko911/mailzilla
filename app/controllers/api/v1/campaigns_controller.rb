class Api::V1::CampaignsController < ApplicationController
  skip_before_action :authorized, only: [:upload, :stats]
  before_action :find_campaign, only: [:update, :send_test, :send_to_segment, :stats]

  def index
    campaigns = Campaign.where(user: current_user)
    render json: campaigns
  end

  def templates
    templates = [1, 2].map do |index|
      {
        template: File.read("public/templates/template_#{index}.html"),
        title: "Template #{index}",
        id: index
      }
    end

    render json: templates
  end

  def stats
    start_date = @campaign.sent_at.to_date
    end_date = start_date + 7.days
  
    result = (start_date..end_date).map do |date|
      {
        date: date.strftime("%B %e, %Y"),
        deliver_at: @campaign.campaign_contacts.where("date(created_at) = ?", date).count,
        open_at: @campaign.campaign_contacts.where("date(open_at) = ?", date).count,
        click_at: @campaign.campaign_contacts.where("date(click_at) = ?", date).count
      }
    end

    render json: result
  end

  def create
    campaign = Campaign.new(campaign_params)
    campaign.status = 0
    campaign.content = File.read("public/templates/template_#{campaign.template_id}.html")
    campaign.save
    render json: campaign
  end

  def upload
    name = params[:upload].original_filename
    name = "#{rand(1000..9999)}_#{name}"

    path = File.join("public", "uploads", name)
    File.open(path, "wb") { |f| f.write(params[:upload].read) }

    render json: {
      uploaded: 1,
      fileName: name,
      url: "http://localhost:3000/uploads/#{name}"
    }
  end

  def update
    @campaign.update(campaign_params)
    render json: @campaign
  end

  def send_test
    @campaign.send_test
    render json: @campaign
  end

  def send_to_segment
    @campaign.send_to_segment
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
