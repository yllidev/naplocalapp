class Conversation < ApplicationRecord
    belongs_to :request
    has_many :messages, dependent: :destroy
    has_and_belongs_to_many :users
end
