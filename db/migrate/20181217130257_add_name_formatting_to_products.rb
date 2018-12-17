class AddNameFormattingToProducts < ActiveRecord::Migration[5.2]
  def change
    add_column :products, :display_name, :string
    add_column :products, :pluralized_name, :string
  end
end
