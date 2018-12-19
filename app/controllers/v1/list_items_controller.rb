class V1::ListItemsController < ApplicationController

  def create

  end

  def destroy
    @list_item = ListItem.find(params[:id])
    @order = Order.find(params[:order_id])

    if @order.list_items.length == 1
      @order.destroy
      render :json => {order: false}
    else
      @list_item.destroy
      updated_order = Order.find(params[:order_id])
      order_total = set_order_total(updated_order)
      updated_order.update(display_total: order_total)
      render :json => {order: updated_order, list_items: updated_order.list_items}
    end
  end

  def set_order_total(order)
    total = 0
    order.list_items.each do |list_item|
      total += list_item.total
    end
    return ActionController::Base.helpers.number_to_currency(total)
  end

end
