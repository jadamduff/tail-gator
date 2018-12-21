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
      placeHolderText: 'Enter a tailgate location...',
      flash: false
    }
  }

  handleBtnClick = () => {
    if (this.props.order.order.address !== '') {
      this.props.updateOrderStatus(this.props.order.order.id, 'Submitted')
    } else {
      this.setState({
        flash: 'Location Required'
      })
      console.log('Location Required')
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
          <LocationSearchInput orderId={this.props.order.order.id} address={this.props.order.order.address} flash={this.state.flash} />
        </div>
        <div className="active-order-submit-btn" onClick={this.handleBtnClick}>FEED THE GATORS</div>
      </div>
    )
  }
}

export default Order
