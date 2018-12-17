import React from 'react'
import Product from './Product'
import CSSTransition from 'react-transition-group/CSSTransition';
import './products.css'

const ProductsList = (props) => {

  const renderProducts = () => {
    let imgUrls = ['hotdog_icon.png', 'cheeseburger_icon.png', '2_liter_icon.png', 'sunscreen_icon.png', 'charcoal_icon.png', 'beer_icon.png'];
    return props.products.map((product, i) => {
      return (<Product product={product} image={imgUrls[i]} key={i} selectProduct={props.selectProduct} productId={i} />)
    })
  }

  return (
    <div className="products-list-container">
      {renderProducts()}
    </div>
  )
}

export default ProductsList;
