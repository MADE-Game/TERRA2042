import React from 'react'
import Card from './Card'
import Plane from './Plane'
import {playCard, drawCard} from '../store/game'
import {connect} from 'react-redux'

const Side = props => {
  console.log(props.hand)
  return (
    <div className="side">
      {props.top ? (
        <div>
          <div className="hero">
            <img src={props.side.heroUrl} />
          </div>
          <div className="hand">
            HAND:
            {props.opponentHand.map(card => {
              return (
                <Card card={card} key={card.id} player="enemy" inHand="true" />
              )
            })}
          </div>
          <Plane
            inPlay={props.opponentInPlay}
            playCard={props.playCard}
            player="enemy"
          />
        </div>
      ) : (
        <div>
          <Plane
            inPlay={props.inPlay}
            playCard={props.playCard}
            player="hero"
          />
          <div className="hand">
            HAND:
            {props.hand.map(card => {
              return (
                <Card card={card} key={card.id} player="hero" inHand={true} />
              )
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
    opponentInPlay: state.game.player2.inPlay,
    hand: state.game.player1.hand,
    opponentHand: state.game.player2.hand
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    playCard: card => dispatch(playCard(card)),
    drawCard: () => dispatch(drawCard())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Side)
