class ModifyOrdersTotal < ActiveRecord::Migration[5.2]
  def change
    rename_column :orders, :total, :display_total
    change_column :orders, :display_total, :string
  end
end
