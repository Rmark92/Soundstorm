class AddUserTrackCount < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :tracks_count, :integer, default: 0
  end
end
