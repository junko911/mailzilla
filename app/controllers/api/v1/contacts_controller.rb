class Api::V1::ContactsController < ApplicationController
  def index
    contacts = Contact.where(user: current_user).order(:name)
    render json: contacts
  end

  def create
    contacts_array = params[:contact][:input_value].split("\n").map { |e| e.split("\t") }
    filtered_array = contacts_array.filter {|contact|
      !Contact.find_by(email: contact[0], name: contact[1], user_id: params[:contact][:user_id])
    }
    contacts = filtered_array.map { |contact|
      Contact.create(email: contact[0], name: contact[1], user_id: params[:contact][:user_id])
    }
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
