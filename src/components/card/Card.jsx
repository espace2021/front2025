import React from 'react'

import "./card.css"
const Card = ({imagepro,title,prix}) => {
  return (
    <div className='card'>
        {imagepro && <img src={imagepro} alt={title} />}
        <div className='card-content'>
            <h1 className='card-title'>{title}</h1>
            
            <h1 className='card-title'>Prix : {prix}TND</h1>
            <button className="card-button"><i className="fa-solid fa-basket-shopping"></i>Add to card</button>
        </div>
      
    </div>
  )
}

export default Card
