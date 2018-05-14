class CreateListensTableWithTimestamps < ActiveRecord::Migration[5.1]
  def change
    create_table :listens_table_with_timestamps do |t|
      t.integer :user_id, null: false
      t.integer :track_id, null: false
      t.timestamps
    end
  end
end
