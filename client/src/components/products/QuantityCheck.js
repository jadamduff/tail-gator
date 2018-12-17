import React from 'react'

import QuantityForm from '../forms/QuantityForm'
import '../ui/ui.css'

const QuantityCheck = (props) => {

  const handleScreenClick = () => {
    props.cancelSelectProduct();
  }

  return (
    <div className="screen-container">
      <div className="screen" onClick={handleScreenClick}></div>
      <div className="bottom-drawer-md slide-down-fast">
        <div className="inline-block">How many {props.pluralizedText}?</div>
        <QuantityForm />
      </div>
    </div>
  )
}

export default QuantityCheck;
