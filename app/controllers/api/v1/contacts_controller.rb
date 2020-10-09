class Api::V1::ContactsController < ApplicationController
  def index
    contacts = Contact.all
    render json: contacts
  end
end
