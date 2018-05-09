class Track < ApplicationRecord
  validates :title, :artist_id, :audio, presence: true
  validates :title, length: { maximum: 50 }
  has_attached_file :audio
  validates_attachment_content_type :audio, :content_type => [ 'audio/mpeg', 'audio/x-mpeg', 'audio/mp3', 'audio/x-mp3', 'audio/mpeg3', 'audio/x-mpeg3', 'audio/mpg', 'audio/x-mpg', 'audio/x-mpegaudio', 'audio/m4a' ]

  belongs_to :artist,
    foreign_key: :artist_id,
    class_name: 'User',
    primary_key: :id




end
