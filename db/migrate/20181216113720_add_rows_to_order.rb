class AddRowsToOrder < ActiveRecord::Migration[5.2]
  def change
    add_column :orders, :in_progress, :boolean
    add_column :orders, :paid, :boolean
    add_column :orders, :received, :boolean
  end
end
