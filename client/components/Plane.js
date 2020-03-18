import React from 'react'
import Card from './Card'
import {ItemTypes} from '../dnd/types'
import {useDrop} from 'react-dnd'

const Plane = props => {
  const [{isOver, canDrop, item}, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: () => {
      console.log('dropped!')
      console.log(item.card)
      props.inPlay.push(item.card)
    },
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
      item: monitor.getItem()
    })
  })

  return (
    <div className="plane" ref={drop}>
      PLANE:
      {props.inPlay.map(card => {
        return <Card card={card} />
      })}
    </div>
  )
}

export default Plane
