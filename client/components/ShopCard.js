import React from 'react'

export const ShopCard = ({card, handleClick}) => {
  const {attack, health, imageUrl, cost} = card
  return (
    <div style={{marginBottom: '3vh'}}>
      <div>
        <div
          className="collectionCard"
          style={{
            // marginRight: '1.75vh',
            fontWeight: 'bold',
            cursor: 'move'
          }}
        >
          <div
            style={{
              marginTop: '-1vh',
              backgroundImage: `url('.${imageUrl}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              minWidth: '12vh',
              minHeight: '20vh',
              display: 'flex',
              flexDirection: 'column',
              color: '#fff',
              justifyContent: 'space-between'
            }}
          >
            <h3
              style={{
                textAlign: 'center',
                margin: 0,
                color: '#fff'
              }}
            >
              {cost}
            </h3>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly'
              }}
            >
              <h3 style={{margin: 0}}>{attack}</h3>
              <h3 style={{margin: 0}}>{health}</h3>
            </div>
          </div>
        </div>
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
