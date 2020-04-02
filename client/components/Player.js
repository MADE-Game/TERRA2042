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
        props.side !== 'bottom' &&
        props.isMyTurn
      ) {
        props.attackHero(item.card, props.player)
      } else {
        toast.warning("It's not your turn!", {
          position: toast.POSITION.TOP_CENTER
        })
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
      {props.side === 'bottom' ? (
        <p className="heroText">Deck: {props.player.deck.length} cards left.</p>
      ) : (
        <div>
          <p className="heroText">
            Deck: {props.player.deck.length} cards left.
          </p>
          <p className="heroText">Opponent hand size is:{props.size}</p>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    isMyTurn: state.game.data.isMyTurn
  }
}

const mapDispatchToProps = dispatch => {
  return {
    attackHero: (attacker, hero) => dispatch(playerAttackHero(attacker, hero))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Player)
