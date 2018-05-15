class AddTrackCommentCount < ActiveRecord::Migration[5.1]
  def change
    add_column :tracks, :comments_count, :integer, default: 0
  end
end
