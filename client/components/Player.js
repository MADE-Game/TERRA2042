import React from 'react'
import {ItemTypes} from '../dnd/types'
import {useDrop} from 'react-dnd'
import {playerAttackHero} from '../store/thunksAndActionCreators'
import {connect} from 'react-redux'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Player = props => {
  const [{isOver, canDrop, item}, drop] = useDrop({
    accept: ItemTypes.CARD,

    drop: () => {
      if (item.card.attackOccurred) {
        toast.warning("This fighter can't attack until next turn!", {
          position: toast.POSITION.TOP_CENTER
        })
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
