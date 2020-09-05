require 'rails_helper'

RSpec.describe Conversation, type: :model do
  it "belongs to request association" do
    Conversation.reflect_on_association(:request).macro.should  eq(:belongs_to)
  end

  it "has many messages association" do
    Conversation.reflect_on_association(:messages).macro.should  eq(:has_many)
  end

  it "has and belongs to many with user association" do
    Conversation.reflect_on_association(:users).macro.should  eq(:has_and_belongs_to_many)
  end
end
