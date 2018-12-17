class V1::ProductsController < ApplicationController

  before_action :authenticate_user, only: [:product_list]

  def product_list
    @products = Product.all
    render :json => {products: @products}
  end

end
