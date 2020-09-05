class AddLimitToRequests < ActiveRecord::Migration[6.0]
  def change
    add_column :requests, :limit, :integer
  end
end
