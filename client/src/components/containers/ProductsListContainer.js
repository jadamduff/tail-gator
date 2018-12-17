import React, { Component } from 'react'
import { connect } from 'react-redux';
import ProductsList from '../products/ProductsList'
import { getProducts, selectProduct, cancelSelectProduct } from '../../actions/products'
import CSSTransition from 'react-transition-group/CSSTransition';

class ProductsListContainer extends Component {
  componentDidMount() {
    this.props.getProducts();
  }

  render() {
    return (
      <ProductsList products={this.props.products} selectProduct={this.props.selectProduct} activeOrderExists={this.props.activeOrderExists} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products.products,
    productSelected: state.products.productSelected,
    selectedProduct: state.products.selectedProduct,
    activeOrderExists: state.order.activeOrderExists
  }
}

export default connect(mapStateToProps, { getProducts, selectProduct })(ProductsListContainer)
