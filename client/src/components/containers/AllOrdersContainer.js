import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getAllOrders } from '../../actions/orders'

class AllOrdersContainer extends Component {
  constructor(props) {
    super(props);
    this.state= {
      userExists: false,
      orders: this.props.orders
    }
  }

  componentWillMount() {
    this.props.getAllOrders();
  }

  componentWillReceiveProps(prev, next) {
    console.log('receive')
    this.setState({
      orders: next.orders
    })
  }

  renderOrders = () => {
    if (this.props.orders) {
      return this.props.orders.map(order => {
        return <li>{order.id}</li>
      })
    } else {
      return <li>No Orders</li>
    }
  }

  render() {
    return (
      <div>
        Orders:
        <ul>
          {this.renderOrders()}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.order.all_orders,
  }
}

export default connect(mapStateToProps, { getAllOrders })(AllOrdersContainer)
