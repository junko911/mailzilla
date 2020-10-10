class AddUserIdToSegments < ActiveRecord::Migration[6.0]
  def change
    add_column :segments, :user_id, :integer
    add_reference :contacts, :user
  end
end
