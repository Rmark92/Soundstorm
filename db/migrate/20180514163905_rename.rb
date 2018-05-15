class Rename < ActiveRecord::Migration[5.1]
  def change
    rename_table :track_plays, :plays
  end
end
