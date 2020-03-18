import React from 'react'
import {ItemTypes} from '../dnd/types'
import {useDrag} from 'react-dnd'

const Card = props => {
  const [{isDragging}, drag] = useDrag({
    item: {type: ItemTypes.CARD, card: props.card},
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    })
  })

  const {name, attack, defense, imageUrl} = props.card
  return (
    <div
      className="card"
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        fontSize: 25,
        fontWeight: 'bold',
        cursor: 'move'
      }}
    >
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
