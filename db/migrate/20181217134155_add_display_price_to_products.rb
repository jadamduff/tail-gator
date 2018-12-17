class AddDisplayPriceToProducts < ActiveRecord::Migration[5.2]
  def change
    add_column :products, :display_price, :string
  end
end
