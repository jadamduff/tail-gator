class Order < ApplicationRecord
  has_many :list_items
  has_many :products, through: :list_items, dependent: :destroy
end
