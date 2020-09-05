require 'rails_helper'

RSpec.describe Message, type: :model do
  it "belongs to user association" do
    Message.reflect_on_association(:user).macro.should  eq(:belongs_to)
  end

  it "belongs to conversation association" do
    Message.reflect_on_association(:conversation).macro.should  eq(:belongs_to)
  end
end
