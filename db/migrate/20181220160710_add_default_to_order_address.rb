class AddDefaultToOrderAddress < ActiveRecord::Migration[5.2]
  def change
    change_column :orders, :address, :string, default: ''
  end
end
