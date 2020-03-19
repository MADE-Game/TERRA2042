import React from 'react'
import {ItemTypes} from '../dnd/types'
import {useDrag, useDrop} from 'react-dnd'
import {attackCard} from '../store/game'
import {connect} from 'react-redux'

const Card = props => {
  const [{isDragging}, drag] = useDrag({
    item: {
      type: props.player === 'hero' ? ItemTypes.CARD : ItemTypes.ENEMY_CARD,
      card: props.card,
      inHand: props.inHand
    },
    collect: monitor => {
      return {
        isDragging: !!monitor.isDragging()
      }
    }
  })
  const [{isOver, canDrop, item}, drop] = useDrop({
    accept: props.player === 'hero' ? ItemTypes.ENEMY_CARD : ItemTypes.CARD,

    drop: () => {
      if (props.player === 'enemy' && !props.inHand && !item.inHand) {
        props.attackCard(item.card, props.card)
      }
    },
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
      item: monitor.getItem()
    })
  })

  const {name, attack, defense, imageUrl} = props.card

  return (
    <div ref={drag}>
      <div
        className="card"
        ref={drop}
        style={{
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
    </div>
  )
}
const mapDispatch = dispatch => ({
  attackCard: (attacker, defender) => dispatch(attackCard(attacker, defender))
})

export default connect(null, mapDispatch)(Card)
