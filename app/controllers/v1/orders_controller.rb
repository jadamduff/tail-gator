class V1::OrdersController < ApplicationController

  before_action :authenticate_user

  def create
    @product = Product.find(params[:product_id])
    @order = Order.create(user_id: params[:user_id], in_progress: true, paid: false, received: false, display_total: (@product.price * params[:product_quantity]).to_f)

    def initial_list_item_desc
      if params[:product_quantity] > 1
        return params[:product_quantity].to_s + ' ' + @product.pluralized_name
      else
        return params[:product_quantity].to_s + ' ' + @product.name
      end
    end

    initial_list_item_total = @product.price * params[:product_quantity].to_i
    initial_list_item_display_total = ActionController::Base.helpers.number_to_currency(initial_list_item_total)

    @list_item = ListItem.create(product_id: params[:product_id], order_id: @order.id, quantity: params[:product_quantity], description: initial_list_item_desc, total: initial_list_item_total, display_total: initial_list_item_display_total)
    @order.update(display_total: set_order_total(@order))

    render :json => {order: @order, list_items: @order.list_items}
  end

  def update

    @order = Order.find(params[:id])
    @product = Product.find(params[:product_id])
    @existing_list_item = false
    list_item_desc = nil

    if ListItem.where({product_id: @product.id, order_id: @order.id}).exists?
      @existing_list_item = ListItem.where({product_id: @product.id, order_id: @order.id}).first
    end

    if @existing_list_item
      list_item_quantity = @existing_list_item.quantity + params[:product_quantity].to_i
      list_item_desc = list_item_quantity.to_s + ' ' + @product.pluralized_name
      list_item_total = @product.price * list_item_quantity
      @existing_list_item.update(quantity: list_item_quantity, description: list_item_desc, total: list_item_total, display_total: ActionController::Base.helpers.number_to_currency(list_item_total))
    else
      if params[:product_quantity] > 1
        list_item_desc = params[:product_quantity].to_s + ' ' + @product.pluralized_name
      else
        list_item_desc = params[:product_quantity].to_s + ' ' + @product.name
      end

      list_item_total = @product.price * params[:product_quantity].to_i
      @list_item = ListItem.create(product_id: @product.id, order_id: @order.id, quantity: params[:product_quantity], description: list_item_desc, total: list_item_total, display_total: ActionController::Base.helpers.number_to_currency(list_item_total))
      @order.update(display_total: set_order_total(@order))
    end

    render :json => {order: @order, list_items: @order.list_items}

  end

  def destroy
    @order = Order.find(params[:id])
    @order.destroy
    render :json => {status: 'Order Destroyed'}
  end

  def active_order
    activeOrderExists = false
    order = {id: nil}
    if Order.where({user_id: current_user.id, in_progress: true}).exists
      order = Order.where({user_id: current_user.id, in_progress: true}).last
      activeOrderExists = true
    end
    render :json => {activeOrderExists: activeOrderExists, order: order, list_items: order.list_items}
  end

  def set_order_total(order)
    total = 0
    order.list_items.each do |list_item|
      total += list_item.total
    end
    return ActionController::Base.helpers.number_to_currency(total)
  end

end
