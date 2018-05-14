class Track < ApplicationRecord
  validates :title, :artist_id, :audio, presence: true
  validates :title, length: { maximum: 50 }
  validates :description, length: { maximum: 255, allow_nil: true }
  has_attached_file :audio
  validates_attachment_content_type :audio, :content_type => [ 'audio/mpeg', 'audio/x-mpeg',
                                                               'audio/mp3', 'audio/x-mp3',
                                                               'audio/mpeg3', 'audio/x-mpeg3',
                                                               'audio/mpg', 'audio/x-mpg',
                                                               'audio/x-mpegaudio', 'audio/x-m4a' ]
  has_attached_file :image, default_url: "missing_cover_art.png"
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/

  belongs_to :artist,
    foreign_key: :artist_id,
    class_name: 'User',
    primary_key: :id

  has_many :listens

  has_many :listeners,
    through: :listens,
    source: :user

  has_many :likes

  has_many :fans,
    through: :likes,
    source: :user
end
