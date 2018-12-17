import React, { Component } from 'react'
import { connect } from 'react-redux';

import ProductsListContainer from './ProductsListContainer'
import Order from '../order/Order'

class ActiveOrderContainer extends Component {
  render() {
    return (
      <div>
        <ProductsListContainer />
        <Order order={this.props.order} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    order: state.order
  }
}

export default connect(mapStateToProps)(ActiveOrderContainer)
