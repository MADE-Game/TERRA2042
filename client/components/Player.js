import React, {useState} from 'react'
import {ItemTypes} from '../dnd/types'
import {useDrop} from 'react-dnd'
import {playerAttackHero} from '../store/thunksAndActionCreators'
import {connect} from 'react-redux'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {bounceIn} from 'react-animations'
import styled, {keyframes} from 'styled-components'

const Bounce = styled.div`
  animation: 1s ${keyframes`${bounceIn}`};
`

const Player = props => {
  const [attacked, setAttacked] = useState(false)
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
        setAttacked(true)
        setTimeout(() => setAttacked(false), 1000)
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
  return attacked ? (
    <div>
      <Bounce>
        <div className="hero" ref={drop}>
          <img src={props.imgUrl} />
        </div>
      </Bounce>
      <p className="heroText">Settlers: {props.player.settlers}</p>
    </div>
  ) : (
    <div className="hero" ref={drop}>
      <img src={props.imgUrl} />
      <p className="heroText">Settlers: {props.player.settlers}</p>
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
