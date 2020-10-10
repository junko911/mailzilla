class Api::V1::ContactsController < ApplicationController

  def index
    contacts = Contact.all
    render json: contacts
  end

  def add_segment
    contact = Contact.find(params[:contact_id].to_i)
    contact.segments << Segment.find(params[:contact][:segment][:id])
    render json: contact
  end
  
  def remove_segment
    contact = Contact.find(params[:contact_id].to_i)
    contact.segments.delete(params[:contact][:segment_id])
    render json: contact
  end

end
