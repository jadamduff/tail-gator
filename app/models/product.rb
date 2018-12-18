class Product < ApplicationRecord
  has_many :list_items
  has_many :orders, through: :list_items, dependent: :destroy
end
