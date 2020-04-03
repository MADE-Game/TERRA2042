import React from 'react'
import {MyIconButton as IconButton} from './IconButton'

export const ShopCard = ({card, handleClick}) => {
  const {name, attack, health, imageUrl, cost} = card
  return (
    <div style={{marginBottom: '3vh'}}>
      <div>
        <div
          className="collectionCard"
          style={{
            fontWeight: 'bold',
            cursor: 'move'
          }}
        >
          <div
            style={{
              marginTop: '-1vh',
              backgroundImage: `url('${imageUrl}')`,
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
            <h3 style={{textAlign: 'center', paddingTop: '7.5vh'}}>{name}</h3>
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
      <IconButton handleClick={handleClick} text="BUY" card={card} />
    </div>
  )
}
