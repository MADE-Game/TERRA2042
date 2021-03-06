/* eslint-disable complexity */
import React from 'react'
import Card from './Card'
import {ItemTypes} from '../dnd/types'
import {useDrop} from 'react-dnd'
import {connect} from 'react-redux'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {pulse, flipOutY} from 'react-animations'
import styled, {keyframes} from 'styled-components'

const Pulse = styled.div`
  animation: 2s ${keyframes`${pulse}`} infinite;
`

const Flip = styled.div`
  animation: 1s ${keyframes`${flipOutY}`};
`

const Plane = props => {
  const [{isOver, canDrop, item}, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: () => {
      if (!props.isMyTurn) {
        return toast.warning("It's not your turn!", {
          position: toast.POSITION.TOP_CENTER
        })
      }

      if (props.player === 'hero' && item.inHand === true) {
        item.card.attackOccurred = true
        props.playCard(item.card)
        if (props.inPlay.length === 5) {
          toast.warning('Your Battlefield is full!', {
            position: toast.POSITION.TOP_CENTER
          })
        }
      }
    },
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
      item: monitor.getItem()
    })
  })

  return (
    <div
      className="plane"
      ref={drop}
      style={{marginTop: '2vh', marginBottom: '2vh'}}
    >
      {props.inPlay.map(card => {
        if (card.attackOccurred && card.health > 0) {
          return (
            <Card
              card={card}
              key={card.id || card._id}
              player={props.player}
              inHand={false}
              healEngaged={props.healEngaged}
            />
          )
        } else if (!card.attackOccurred && card.health > 0) {
          return (
            <Pulse key={card.id || card._id}>
              <Card
                inPlane={true}
                card={card}
                key={card.id || card._id}
                player={props.player}
                inHand={false}
              />
            </Pulse>
          )
        } else {
          return (
            <Flip key={card.id || card._id}>
              <Card
                card={card}
                key={card.id || card._id}
                player={props.player}
                inHand={false}
                healEngaged={props.healEngaged}
              />
            </Flip>
          )
        }

        // return card.attackOccurred ? (
        //   <Card
        //     card={card}
        //     key={card.id || card._id}
        //     player={props.player}
        //     inHand={false}
        //     healEngaged={props.healEngaged}
        //   />
        // ) : (
        //   <Pulse key={card.id || card._id}>
        //     <Card
        //       inPlane={true}
        //       card={card}
        //       key={card.id || card._id}
        //       player={props.player}
        //       inHand={false}
        //     />
        //   </Pulse>
        // )
      })}
    </div>
  )
}
const mapState = state => ({
  isMyTurn: state.game.data.isMyTurn
})
export default connect(mapState)(Plane)
