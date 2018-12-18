import React, { Component } from 'react'
import { connect } from 'react-redux';
import Product from './Product'
import './products.css'
import '../ui/ui.css'

class ProductsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      divClasses: {
        productsListContainer: ['products-list-container', 'products-list-container-visible']
      }
    }
  }

  renderProducts = () => {
    let imgUrls = ['hotdog_icon.png', 'cheeseburger_icon.png', '2_liter_icon.png', 'sunscreen_icon.png', 'charcoal_icon.png', 'beer_icon.png'];
    return this.props.products.map((product, i) => {
      return (<Product product={product} image={imgUrls[i]} key={i} selectProduct={this.props.selectProduct} />)
    })
  }

  render() {
    return (
      <div className={this.state.divClasses.productsListContainer.join(' ')}>
        {this.renderProducts()}
      </div>
    )
  }
}

export default ProductsList;
