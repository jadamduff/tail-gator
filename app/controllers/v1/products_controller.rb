class V1::ProductsController < ApplicationController

  def product_list
    @products = Product.all
    render :json => {products: @products}
  end

end
