class DropListensTable < ActiveRecord::Migration[5.1]
  def change
    drop_table :listens
  end
end
