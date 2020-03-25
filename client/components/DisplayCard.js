import React from 'react'

const DisplayCard = props => {
  const {name, attack, health, imageUrl, cost} = props.card
  return (
    <div style={{marginTop: '3vh'}}>
      <div
        className="collectionCard"
        style={{
          fontSize: 12,
          fontWeight: 'bold',
          cursor: 'move'
        }}
      >
        <div>
          <h3
            style={{
              textAlign: 'right',
              paddingRight: '1em'
            }}
          >
            Cost: {cost}
          </h3>
        </div>
        <img src={imageUrl} className="collectionCardImg" />
        <h2
          style={{
            textAlign: 'center'
          }}
        >
          {name}
        </h2>
        <div
          className="stats"
          style={{
            // paddingRight: '1em',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly'
          }}
        >
          <h3>{attack}</h3>
          <h3>{health}</h3>
        </div>
      </div>
    </div>
  )
}

export default DisplayCard
