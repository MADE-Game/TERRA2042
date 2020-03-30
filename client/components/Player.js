import React from 'react'
import {ItemTypes} from '../dnd/types'
import {useDrop} from 'react-dnd'
import {playerAttackHero} from '../store/thunksAndActionCreators'
import {connect} from 'react-redux'

const Player = props => {
  const [{isOver, canDrop, item}, drop] = useDrop({
    accept: ItemTypes.CARD,

    drop: () => {
      if (item.card.attackOccurred) {
        // eslint-disable-next-line no-alert
        alert("This fighter can't attack until next turn")
      } else if (
        !item.inHand &&
        item.player === 'hero' &&
        props.side !== 'bottom'
      ) {
        props.attackHero(item.card, props.player)
      }
    },
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
      item: monitor.getItem()
    })
  })
  return (
    <div className="hero" ref={drop}>
      <img src={props.imgUrl} />
      <p className="heroText">Settlers: {props.player.settlers}</p>
    </div>
  )
}
const mapDispatchToProps = dispatch => {
  return {
    attackHero: (attacker, hero) => dispatch(playerAttackHero(attacker, hero))
  }
}

export default connect(null, mapDispatchToProps)(Player)
