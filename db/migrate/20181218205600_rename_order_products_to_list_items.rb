class RenameOrderProductsToListItems < ActiveRecord::Migration[5.2]
  def change
    rename_table :order_products, :list_items
  end
end
