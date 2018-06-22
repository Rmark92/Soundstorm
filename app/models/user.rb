class User < ApplicationRecord
  validates :username, :password_digest, :session_token, presence: true
  validates :username, uniqueness: true
  validates :username, length: { minimum: 4, maximum: 50 }
  validates :password, length: { minimum: 6, allow_nil: true }
  has_attached_file :image, default_url: "missing_user.png"
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/

  has_many :tracks,
    foreign_key: :artist_id,
    class_name: 'Track',
    primary_key: :id

  has_many :plays

  has_many :listened_tracks,
    through: :plays,
    source: :track

  has_many :likes

  has_many :liked_tracks,
    through: :likes,
    source: :track

  has_many :comments

  has_many :playlists

  attr_reader :password

  after_initialize { ensure_session_token }

  def self.find_by_credentials(username, password)
    user = User.find_by({ username: username });
    (user && user.is_password?(password)) ? user : nil
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def self.generate_session_token
    SecureRandom.urlsafe_base64(16)
  end

  def ensure_session_token
    self.session_token ||= User.generate_session_token
  end

  def reset_token!
    self.session_token = User.generate_session_token
    save!
    self.session_token
  end
end
