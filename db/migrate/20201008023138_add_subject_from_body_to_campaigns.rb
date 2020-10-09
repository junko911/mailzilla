class AddSubjectFromBodyToCampaigns < ActiveRecord::Migration[6.0]
  def change
    add_column :campaigns, :subject, :string
    add_column :campaigns, :from, :string
    add_column :campaigns, :content, :text
    add_column :campaigns, :template_id, :integer
    add_reference :campaigns, :segment
    add_reference :campaigns, :user
  end
end
