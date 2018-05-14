class CreateLikesTable < ActiveRecord::Migration[5.1]
  def change
    create_table :likes do |t|
      t.integer :user_id, null: false
      t.integer :track_id, null: false
      t.timestamps
      t.index [:user_id, :track_id], unique: true
    end
  end
end
