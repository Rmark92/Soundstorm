class Playlist < ApplicationRecord
  validates :user_id, :title, presence: true
  validates :user_id, uniqueness: { scope: :title }

  belongs_to :user
  has_many :playlist_tracks
  has_many :tracks,
    through: :playlist_tracks,
    source: :track
end
