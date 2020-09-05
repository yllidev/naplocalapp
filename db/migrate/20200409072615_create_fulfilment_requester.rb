class CreateFulfilmentRequester < ActiveRecord::Migration[6.0]
  def change
    create_table :fulfilment_requesters do |t|
      t.integer   :request_id
      t.integer  :creator_id
      t.integer  :requester_id
    end
  end
end
