class RenameListensTable < ActiveRecord::Migration[5.1]
  def change
    rename_table :listens_table_with_timestamps, :track_plays
  end
end
