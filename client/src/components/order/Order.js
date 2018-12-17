import React, { Component } from 'react'

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div style={{width: '300px', height: '400px', border: '1px solid #424242', margin: '0 0 0 50px', display: 'inline-block'}}>{this.props.order.list_items[0].list_item}</div>
    )
  }
}

export default Order
