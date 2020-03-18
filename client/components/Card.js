import React from 'react'

const Card = props => {
  const {name, attack, defense, imageUrl} = props.card
  return (
    <div className="card">
      <h1>{name}</h1>
      <img src={imageUrl} />
      <div className="stats">
        <h2>{attack}</h2>
        <h2>{defense}</h2>
      </div>
    </div>
  )
}

export default Card
