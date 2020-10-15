class Api::V1::SegmentsController < ApplicationController

  def index
    segments = Segment.where(user: current_user)
    render json: segments
  end

  def create
    segment = current_user.segments.find_or_create_by(segment_params)
    render json: segment
  end

  private

  def segment_params
    params.require(:segment).permit!
  end
end
