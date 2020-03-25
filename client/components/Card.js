import React from 'react'
import {ItemTypes} from '../dnd/types'
import {useDrag, useDrop} from 'react-dnd'
import {playerAttackCard} from '../store/thunksAndActionCreators'
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
      if (!item.card.attackOccurred) {
        if (props.player === 'enemy' && !props.inHand && !item.inHand) {
          props.attackCard(item.card, props.card)
        }
      } else {
        // eslint-disable-next-line no-alert
        alert('Fighters can only attack once per turn!')
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
          fontSize: 12,
          fontWeight: 'bold',
          cursor: 'move'
        }}
      >
        <div>
          <p
            style={{
              textAlign: 'right',
              paddingRight: '1em'
            }}
          >
            Cost: {cost}
          </p>
        </div>
        <img src={imageUrl} style={{width: '11vh'}} />
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
          <p>{attack}</p>
          <p>{health}</p>
        </div>
      </div>
    </div>
  )
}

const mapDispatch = dispatch => ({
  attackCard: (attacker, defender) =>
    dispatch(playerAttackCard(attacker, defender))
})

export default connect(null, mapDispatch)(Card)
