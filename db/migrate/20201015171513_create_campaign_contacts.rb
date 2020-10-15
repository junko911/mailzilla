class CreateCampaignContacts < ActiveRecord::Migration[6.0]
  def change
    create_table :campaign_contacts do |t|
      t.belongs_to :campaign
      t.belongs_to :contact
      t.string :status

      t.timestamps
    end
  end
end
