import React from 'react'
import Card from './Card'
import Plane from './Plane'
import {playCard, drawCard} from '../store/game'
import {connect} from 'react-redux'

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
              return <Card card={card} key={card.id} player="enemy" />
            })}
          </div>
          <Plane inPlay={props.side.inPlay} />
        </div>
      ) : (
        <div>
          <Plane inPlay={props.inPlay} playCard={props.playCard} />
          <div className="hand">
            HAND:
            {props.hand.map(card => {
              return <Card card={card} key={card.id} player="hero" />
            })}
          </div>
          <div className="hero">
            <img src={props.side.heroUrl} />
          </div>
          <button type="submit" onClick={props.drawCard}>
            Draw Card Button
          </button>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = function(state) {
  return {
    inPlay: state.game.player1.inPlay,
    hand: state.game.player1.hand
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    playCard: card => dispatch(playCard(card)),
    drawCard: () => dispatch(drawCard())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Side)
