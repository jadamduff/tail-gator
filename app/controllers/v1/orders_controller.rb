class V1::OrdersController < ApplicationController

  before_action :authenticate_user

  def create
    @product = Product.find(params[:product_id])
    @order = Order.create(user_id: params[:user_id], in_progress: true, paid: false, received: false, total: (@product.price * params[:product_quantity]).to_f)
    @order_product = OrderProduct.create(product_id: params[:product_id], order_id: @order.id, quantity: params[:product_quantity])
    def initial_list_item_desc
      if @order_product.quantity > 1
        return @order_product.quantity.to_s + ' ' + @product.pluralized_name
      else
        return @order_product.quantity.to_s + ' ' + @product.name
      end
    end
    initial_list_item = {list_item: initial_list_item_desc, list_item_total: ActionController::Base.helpers.number_to_currency(@product.price * params[:product_quantity])}

    render :json => {order: @order, order_total: ActionController::Base.helpers.number_to_currency(@order.total), list_items: [initial_list_item]}
  end

  def update

    @order = Order.find(params[:id])
    @product = Product.find(params[:product_id])
    @existing_order_product = false
    if OrderProduct.where({product_id: @product.id, order_id: @order.id}).exists?
      @existing_order_product = OrderProduct.where({product_id: @product.id, order_id: @order.id}).first
    end

    if @existing_order_product
      @existing_order_product.update(quantity: @existing_order_product.quantity + params[:product_quantity].to_i)
    else
      OrderProduct.create(product_id: @product.id, order_id: @order.id, quantity: params[:product_quantity])
    end

    list_items = []
    order_total = 0

    OrderProduct.where({order_id: @order.id}).each do |order_product|
      product = Product.find(order_product.product_id)

      if order_product.quantity > 1
        list_item_desc = order_product.quantity.to_s + ' ' + product.pluralized_name
      else
        list_item_desc = order_product.quantity.to_s + ' ' + product.name
      end

      list_item_total = product.price * order_product.quantity

      list_item = {
        list_item: list_item_desc,
        list_item_total: ActionController::Base.helpers.number_to_currency(list_item_total)
      }

      order_total += list_item_total
      list_items << list_item
    end

    render :json => {order: @order, order_total: ActionController::Base.helpers.number_to_currency(order_total), list_items: list_items}

  end

  def destroy
    @order = Order.find(params[:id])
    @order.destroy
    render :json => {status: 'Order Destroyed'}
  end

end
