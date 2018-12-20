import React, { Component } from 'react'

import ListItemListContainer from '../containers/ListItemListContainer'
import LocationSearchInput from '../forms/LocationSearchInput'
import '../ui/ui.css'
import './order.css'

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      divClasses: {
        orderContainer: ['fade-in-fast', 'inner-active-order-container']
      },
      placeHolderText: 'Enter a tailgate location...'
    }
  }

  handleBtnClick = () => {
    this.props.updateOrderStatus(this.props.order.order.id, 'Submitted')
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
          <LocationSearchInput orderId={this.props.order.order.id} address={this.props.order.order.address}/>
        </div>
        <div className="active-order-submit-btn" onClick={this.handleBtnClick}>FEED THE GATORS</div>
      </div>
    )
  }
}

export default Order
