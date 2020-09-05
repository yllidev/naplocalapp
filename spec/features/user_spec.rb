require 'rails_helper'

FactoryBot.define do
  factory :user do
    email { "test@yopmail.com" }
    first_name { "test" }
    last_name { "k" }
    password {"12345678"}
  end
end
