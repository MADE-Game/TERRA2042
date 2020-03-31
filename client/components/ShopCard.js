import React from 'react'

export const ShopCard = ({card, handleClick}) => {
  return (
    <div
      id="card"
      className="card"
      style={{
        fontSize: 12,
        fontWeight: 'bold'
      }}
    >
      <div>
        <p
          style={{
            textAlign: 'right',
            paddingRight: '1em'
          }}
        >
          Cost: 1
        </p>
      </div>
      <img src={card.imageUrl} style={{width: '11vh'}} />
      <h2
        style={{
          textAlign: 'center'
        }}
      >
        {card.name}
      </h2>
      <div
        className="stats"
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly'
        }}
      >
        <span>~ {card.attack} ~</span>
        <span>~ {card.health} ~</span>
        <br />
      </div>
      <button
        type="button"
        className="buttonStyle1"
        onClick={() => handleClick(card._id, card.cost)}
      >
        Buy
      </button>
    </div>
  )
}
