class ModifyOrdersColumns < ActiveRecord::Migration[5.2]
  def change
    remove_column :orders, :location
    remove_column :orders, :date
    remove_column :orders, :in_progress
    remove_column :orders, :paid
    remove_column :orders, :received

    add_column :orders, :address, :string, default: ''
    add_column :orders, :status, :string, default: 'Active'
    add_column :orders, :lat, :float
    add_column :orders, :lng, :float
  end
end
