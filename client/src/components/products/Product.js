import React from 'react'
import './products.css'

const Product = (props) => {

  const handleClick = () => {
    console.log('click')
    props.selectProduct(props.productId)
  }

  return (
    <div className="product-box" onClick={handleClick}>
      <div className="product-box-price">{props.price}</div>
      <img src={require('../../images/' + props.image)} />
      <div className="product-name">{props.product.name}</div>
    </div>
  )
}

export default Product;
