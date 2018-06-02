class CreatePlaylistsTracks < ActiveRecord::Migration[5.1]
  def change
    create_table :playlists_tracks do |t|
      t.integer :playlist_id, null: false
      t.integer :track_id, null: false
      t.timestamps
    end
  end
end
