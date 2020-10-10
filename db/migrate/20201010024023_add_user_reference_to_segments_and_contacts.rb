class AddUserReferenceToSegmentsAndContacts < ActiveRecord::Migration[6.0]
  def change
    add_reference :contacts, :user
    add_reference :segments, :user
  end
end
