class CreateListensTable < ActiveRecord::Migration[5.1]
  def change
    create_table :listens do |t|
      t.integer :user_id, null: false
      t.integer :track_id, null: false
    end
  end
end
