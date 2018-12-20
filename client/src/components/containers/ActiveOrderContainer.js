import React, { Component } from 'react'
import { connect } from 'react-redux';
import { updateOrderStatus } from '../../actions/orders'

import ProductsListContainer from './ProductsListContainer'
import Order from '../order/Order'

import '../order/order.css'
import '../ui/ui.css'

class ActiveOrderContainer extends Component {
  render() {
    return (
      <div style={{position: 'relative'}}>
        <div className="active-order-product-list-container slide-in-left">
          <ProductsListContainer />
        </div>
        <div className="active-order-container">
          <Order order={this.props.order} updateOrderStatus={this.props.updateOrderStatus}/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    order: state.order
  }
}

export default connect(mapStateToProps, { updateOrderStatus })(ActiveOrderContainer)
