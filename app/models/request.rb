class Request < ApplicationRecord
  belongs_to :user
  belongs_to :request_category
  has_many :conversations, dependent: :destroy

  validates_presence_of :latitude, :longitude
  validates_inclusion_of :fulfilled, :in => [true, false]
  validates :description, presence: true, length: { maximum: 300 }

  def replied_user_ids
    self.conversations.map(&:user_id)
  end

  def last_replied_within_day
    if self.conversations.count > 4
      return self.conversations.last.created_at.between?(Time.now-1.day, Time.now)
    end
    false 
  end
end
