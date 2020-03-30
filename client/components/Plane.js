import React from 'react'
import Card from './Card'
import {ItemTypes} from '../dnd/types'
import {useDrop} from 'react-dnd'
import {connect} from 'react-redux'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Plane = props => {
  const [{isOver, canDrop, item}, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: () => {
      if (!props.isMyTurn) {
        return console.log('it is not my turn!')
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
    <div className="plane" ref={drop}>
      {props.inPlay.map(card => {
        return (
          <Card
            card={card}
            key={card.id || card._id}
            player={props.player}
            inHand={false}
          />
        )
      })}
    </div>
  )
}
const mapState = state => ({
  isMyTurn: state.game.data.isMyTurn
})
export default connect(mapState)(Plane)
