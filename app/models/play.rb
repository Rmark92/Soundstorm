class Play < ApplicationRecord
  validates :user, :track, presence: true

  belongs_to :user
  belongs_to :track, counter_cache: true
end
