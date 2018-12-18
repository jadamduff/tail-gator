class AddColumnsToListItems < ActiveRecord::Migration[5.2]
  def change
    add_column :list_items, :description, :string
    add_column :list_items, :display_total, :string
  end
end
