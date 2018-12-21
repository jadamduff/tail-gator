class V1::OrdersController < ApplicationController

  before_action :authenticate_user

  def create
    @product = Product.find(params[:product_id])
    order_total = (@product.price * params[:product_quantity]).to_f
    @order = Order.create(user_id: params[:user_id], total: order_total, display_total: ActionController::Base.helpers.number_to_currency(order_total))

    def initial_list_item_desc
      if params[:product_quantity] > 1
        return params[:product_quantity].to_s + ' ' + @product.pluralized_name
      else
        return params[:product_quantity].to_s + ' ' + @product.name
      end
    end

    initial_list_item_total = order_total
    initial_list_item_display_total = ActionController::Base.helpers.number_to_currency(initial_list_item_total)

    @list_item = ListItem.create(product_id: params[:product_id], order_id: @order.id, quantity: params[:product_quantity], description: initial_list_item_desc, total: initial_list_item_total, display_total: initial_list_item_display_total)

    render :json => {order: @order, list_items: @order.list_items}
  end

  def update

    @order = Order.find(params[:id])
    activeOrderExists = true
    order_obj = @order
    return_obj = {}

    if params[:request_type] == 'Add List Item'
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
        new_order_total = set_order_total(@order)
        @order.update(total: new_order_total, display_total: ActionController::Base.helpers.number_to_currency(new_order_total))
      end
      render_obj = {order: @order, list_items: @order.list_items, activeOrderExists: activeOrderExists}
    elsif params[:request_type] == 'Update Location'
      @order.update(address: params[:address], lat: params[:lat], lng: params[:lng])
      render_obj = {order: @order, list_items: @order.list_items, activeOrderExists: activeOrderExists}
    elsif params[:request_type] == 'Update Status'
      @order.update(status: params[:status])
      if params[:status] == 'Complete'
        activeOrderExists = false
        render_obj = {order: {id: nil}, activeOrderExists: activeOrderExists}
      elsif params[:status] == 'Submitted' || params[:status] === 'Paid'
        render_obj = {order: @order, list_items: @order.list_items, activeOrderExists: activeOrderExists}
      end
    end
    render :json => render_obj
  end

  def destroy
    @order = Order.find(params[:id])
    @order.destroy
    render :json => {status: 'Order Destroyed'}
  end

  def active_order
    activeOrderExists = false
    order = {id: nil}
    render_obj = {}
    if Order.where({user_id: current_user.id, status: 'Active'}).or(Order.where({user_id: current_user.id, status: 'Submitted'})).or(Order.where({user_id: current_user.id, status: 'Paid'})).exists?
      order = Order.where({user_id: current_user.id, status: 'Active'}).or(Order.where({user_id: current_user.id, status: 'Submitted'})).or(Order.where({user_id: current_user.id, status: 'Paid'})).last
      activeOrderExists = true
      render_obj = {activeOrderExists: activeOrderExists, order: order, list_items: order.list_items}
    else
      render_obj = {activeOrderExists: activeOrderExists, order: order}
    end

    render :json => render_obj

  end

  def set_order_total(order)
    total = 0
    order.list_items.each do |list_item|
      total += list_item.total
    end
    return total
  end

end
