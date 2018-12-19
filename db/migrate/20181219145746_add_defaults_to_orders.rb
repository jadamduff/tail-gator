class AddDefaultsToOrders < ActiveRecord::Migration[5.2]
  def change
    change_column :orders, :in_progress, :boolean, default: true
    change_column :orders, :paid, :boolean, default: false
    change_column :orders, :received, :boolean, default: false
  end
end
