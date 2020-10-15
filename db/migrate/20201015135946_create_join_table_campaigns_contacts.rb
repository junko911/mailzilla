class CreateJoinTableCampaignsContacts < ActiveRecord::Migration[6.0]
  def change
    create_join_table :campaigns, :contacts
  end
end
