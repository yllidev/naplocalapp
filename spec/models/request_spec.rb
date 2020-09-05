require 'rails_helper'

RSpec.describe Request, type: :model do
  it "belongs to user association" do
    Request.reflect_on_association(:user).macro.should  eq(:belongs_to)
  end

  it "belongs to request category association" do
    Request.reflect_on_association(:request_category).macro.should  eq(:belongs_to)
  end

  it "has many conversations association" do
    Request.reflect_on_association(:conversations).macro.should  eq(:has_many)
  end
end
