class AddTracksCounterCaches < ActiveRecord::Migration[5.1]
  def change
    add_column :tracks, :likes_count, :integer, default: 0
    add_column :tracks, :plays_count, :integer, default: 0
  end
end
