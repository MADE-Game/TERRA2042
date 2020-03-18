import React from 'react'
import Card from './Card'
import Plane from './Plane'

const Side = props => {
  return (
    <div className="side">
      {props.top ? (
        <div>
          <div className="hero">
            <img src={props.side.heroUrl} />
          </div>
          <div className="hand">
            HAND:
            {props.side.hand.map(card => {
              return <Card card={card} />
            })}
          </div>
          <Plane inPlay={props.side.inPlay} />
        </div>
      ) : (
        <div>
          <Plane inPlay={props.side.inPlay} />
          <div className="hand">
            HAND:
            {props.side.hand.map(card => {
              return <Card card={card} />
            })}
          </div>
          <div className="hero">
            <img src={props.side.heroUrl} />
          </div>
        </div>
      )}
    </div>
  )
}

export default Side
