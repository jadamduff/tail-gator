import React from 'react'
import './products.css'

const Product = (props) => {

  const handleClick = () => {
    console.log('click')
    props.selectProduct(props.product)
  }

  return (
    <div className="product-box" onClick={handleClick}>
      <div className="product-box-price">{props.product.display_price}</div>
      <img src={require('../../images/' + props.image)} />
      <div className="product-name">{props.product.display_name}</div>
    </div>
  )
}

export default Product;
