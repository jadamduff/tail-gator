import React from 'react'
import Product from './Product'
import CSSTransition from 'react-transition-group/CSSTransition';
import './products.css'
import '../ui/ui.css'

const ProductsList = (props) => {

  const renderProducts = () => {
    let imgUrls = ['hotdog_icon.png', 'cheeseburger_icon.png', '2_liter_icon.png', 'sunscreen_icon.png', 'charcoal_icon.png', 'beer_icon.png'];
    let prices = ['$1', '$2', '$2.5', '$10', '$30', '$18'];
    return props.products.map((product, i) => {
      return (<Product product={product} image={imgUrls[i]} price={prices[i]} key={i} selectProduct={props.selectProduct} productId={i} />)
    })
  }

  return (
    <div className="products-list-container fade-in-fast">
      {renderProducts()}
    </div>
  )
}

export default ProductsList;
