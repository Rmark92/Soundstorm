class AddDescriptionCol < ActiveRecord::Migration[5.1]
  def change
    add_column :tracks, :description, :text, default: ''
  end
end
