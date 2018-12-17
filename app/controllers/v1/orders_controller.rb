class V1::OrdersController < ApplicationController

  before_action :authenticate_user

  def create
    @product = Product.find(params[:product_id])
    @order = Order.create(user_id: params[:user_id], in_progress: true, paid: false, received: false, total: (@product.price * params[:product_quantity]).to_f)
    @order_product = OrderProduct.create(product_id: params[:product_id], order_id: @order.id, quantity: params[:product_quantity])
    def initial_list_item_obj
      if @order_product.quantity > 1
        return @order_product.quantity.to_s + ' ' + @product.pluralized_name
      else
        return @order_product.quantity.to_s + ' ' + @product.name
      end
    end
    initial_list_item = {list_item: initial_list_item_obj, list_item_total: ActionController::Base.helpers.number_with_precision((@product.price * params[:product_quantity]), :precision => 2)}

    render :json => {order: @order, order_total: ActionController::Base.helpers.number_to_currency(@order.total), list_items: [initial_list_item]}
  end

  def update

  end

  def destroy
    @order = Order.find(params[:id])
    @order.destroy
    render :json => {status: 'Order Destroyed'}
  end

end
