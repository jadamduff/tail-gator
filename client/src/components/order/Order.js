import React, { Component } from 'react'
import '../ui/ui.css'
import './order.css'

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      divClasses: {
        orderContainer: ['fade-in-fast', 'inner-active-order-container']
      }
    }
  }

  render() {
    return (
      <div className={this.state.divClasses.orderContainer.join(' ')} style={{}}>
        <div className="active-order-header">Your Order</div>
        <div className="active-order-list-item-container">
          {this.props.order.list_items[0].list_item}
        </div>
        <div className="active-order-total-container">
          <div className="active-order-total-label">Total</div>
          <div className="active-order-total-amount">{this.props.order.order_total}</div>
          <div className="active-order-submit-btn">FEED THE GATORS</div>
        </div>
      </div>
    )
  }
}

export default Order
