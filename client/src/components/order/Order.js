import React, { Component } from 'react'

import ListItemListContainer from '../containers/ListItemListContainer'
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
        <ListItemListContainer listItems={this.props.order.list_items} />
        <div className="active-order-total-container">
          <div className="active-order-total-label">Total</div>
          <div className="active-order-total-amount">{this.props.order.order.display_total}</div>
        </div>
        <div className="active-order-location-input-container">
          <input type="text" className="location-search-input" />
        </div>
        <div className="active-order-submit-btn">FEED THE GATORS</div>
      </div>
    )
  }
}

export default Order
