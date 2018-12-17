import React from 'react'
import './ui.css'

const WelcomeMessage = (props) => {
  return (
    <div className="welcome-message">
      Hey {props.name}, what can we bring to your tailgate?
    </div>
  )
}

export default WelcomeMessage;
