class V1::OrdersController < ApplicationController

  before_action :authenticate_user

  def create
    @product = Product.find(params[:product_id])
    @order = Order.create(user_id: params[:user_id], in_progress: true, paid: false, received: false, total: (@product.price * params[:product_quantity]).to_f)
    @list_item = ListItem.create(product_id: params[:product_id], order_id: @order.id, quantity: params[:product_quantity])
    def initial_list_item_desc
      if @list_item.quantity > 1
        return @list_item.quantity.to_s + ' ' + @product.pluralized_name
      else
        return @list_item.quantity.to_s + ' ' + @product.name
      end
    end
    initial_list_item = {list_item: initial_list_item_desc, list_item_total: ActionController::Base.helpers.number_to_currency(@product.price * params[:product_quantity])}

    render :json => {order: @order, order_total: ActionController::Base.helpers.number_to_currency(@order.total), list_items: [initial_list_item]}
  end

  def update

    @order = Order.find(params[:id])
    @product = Product.find(params[:product_id])
    @existing_list_item = false
    if ListItem.where({product_id: @product.id, order_id: @order.id}).exists?
      @existing_list_item = ListItem.where({product_id: @product.id, order_id: @order.id}).first
    end

    if @existing_list_item
      @existing_list_item.update(quantity: @existing_list_item.quantity + params[:product_quantity].to_i)
    else
      ListItem.create(product_id: @product.id, order_id: @order.id, quantity: params[:product_quantity])
    end

    list_items = []
    order_total = 0

    ListItem.where({order_id: @order.id}).each do |list_item|
      product = Product.find(list_item.product_id)

      if list_item.quantity > 1
        list_item_desc = list_item.quantity.to_s + ' ' + product.pluralized_name
      else
        list_item_desc = list_item.quantity.to_s + ' ' + product.name
      end

      list_item_total = product.price * list_item.quantity

      list_item_obj = {
        list_item: list_item_desc,
        list_item_total: ActionController::Base.helpers.number_to_currency(list_item_total)
      }

      order_total += list_item_total
      list_items << list_item_obj
    end

    render :json => {order: @order, order_total: ActionController::Base.helpers.number_to_currency(order_total), list_items: list_items}

  end

  def destroy
    @order = Order.find(params[:id])
    @order.destroy
    render :json => {status: 'Order Destroyed'}
  end

end
