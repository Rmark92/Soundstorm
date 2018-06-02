class CreateUsersPlaylists < ActiveRecord::Migration[5.1]
  def change
    create_table :playlists do |t|
      t.integer :user_id, null: false
      t.string :title, null: false
      t.index [:user_id, :title], unique: true
      t.timestamps
    end
  end
end
