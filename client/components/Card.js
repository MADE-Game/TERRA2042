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
      inHand: props.inHand,
      player: props.player
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

  const {name, attack, health, imageUrl, cost} = props.card
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
        <img src={imageUrl} />
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
const mapDispatch = dispatch => ({
  attackCard: (attacker, defender) => dispatch(attackCard(attacker, defender))
})

export default connect(null, mapDispatch)(Card)
