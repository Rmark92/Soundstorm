class Comment < ApplicationRecord
  validates :user, :track, presence: true

  belongs_to :user
  belongs_to :track
end
