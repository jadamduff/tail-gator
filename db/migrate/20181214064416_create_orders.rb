class CreateOrders < ActiveRecord::Migration[5.2]
  def change
    create_table :orders do |t|
      t.float :location
      t.datetime :date
      t.float :total
      t.integer :user_id

      t.timestamps
    end
  end
end
