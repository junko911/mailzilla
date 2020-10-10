class Api::V1::ContactsController < ApplicationController
  before_action :find_contact, only: [:add_segment]

  def index
    contacts = Contact.all
    render json: contacts
  end

  # def add_segment
  #   segment = Segment.find_or_create_by()
  # end

  private

  def find_contact
    @contact = Contact.find(params[:id])
  end
end
