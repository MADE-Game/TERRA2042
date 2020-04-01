import React from 'react'
import Card from './Card'
import Plane from './Plane'
import {
  endTurn,
  playerPlayCard,
  playerDrawCard,
  saveGame,
  incrementTheSettlers,
  hurtByTheDraw,
  cultistDrawCard
} from '../store/thunksAndActionCreators'
import Chat from './Chat'
import {Link} from 'react-router-dom'
import {socket} from './Room'
import {connect} from 'react-redux'
import Player from './Player'
import {zoomInLeft} from 'react-animations'
import styled, {keyframes} from 'styled-components'

const Draw = styled.div`
  animation: 1s ${keyframes`${zoomInLeft}`};
`

// eslint-disable-next-line complexity
const Side = props => {
  return (
    <div className="side">
      {/* player or opponent boolean check */}
      {props.top ? (
        // if props.top is defined aka opponent side
        <div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '15%',
              alignItems: 'center',
              marginLeft: '42.5%',
              marginRight: '42.5%'
            }}
          >
            <Player
              imgUrl={props.side.heroUrl}
              player={props.opponent}
              side="top"
            />
            <p className="heroText">Deck: {props.opponent.deck} cards left.</p>
            <p className="heroText">
              Opponent hand size is:{props.opponent.hand}
            </p>
          </div>
          <Plane
            inPlay={props.opponentInPlay}
            playCard={card => props.playCard(props.opponent, card)}
            player="enemy"
            className="planeStyle"
          />
        </div>
      ) : (
        // if props.top is undefined aka player side
        <div style={{borderTop: '2px dashed #5f1d18'}}>
          <Plane
            inPlay={props.inPlay}
            playCard={card => props.playCard(props.player, card)}
            player="hero"
            planeFull={props.planeFull}
          />

          <div style={{display: 'flex', flexDirection: 'column-reverse'}}>
            {/* boolean that checks whether or not its the players turn */}
            {props.canDraw ? (
              /* boolean that checks whether or not the player has cards in their deck */
              props.player.deck.length ? (
                //if they have cards in their deck
                <div style={{paddingLeft: '3vh'}}>
                  <button
                    className="buttonStyle3"
                    type="submit"
                    onClick={() =>
                      props.drawCard(props.player.deck, props.user)
                    }
                  >
                    <p className="buttonText">Draw Card</p>
                  </button>
                  {/* boolean that checks whether or not the player has finished their turn */}
                  {!props.isFinished ? (
                    /* boolean that checks whether or not the player has drawn a card this turn */
                    props.canDraw ? (
                      //if the player hasn't drawn a card
                      <div id="buttonContainer">
                        <button
                          disabled={!props.gameState.data.isMyTurn}
                          className="buttonStyle3"
                          type="submit"
                          style={{marginTop: '-4vh'}}
                          onClick={() => {
                            // if (props.timeout) clearTimeout(props.timeout)
                            console.log('saving gameState', props.gameState)
                            props.endTurn(
                              props.gameId,
                              props.gameState,
                              props.player,
                              props.user
                            )

                            window.KEY = Math.random()
                          }}
                        >
                          <p className="buttonText">End Turn</p>
                        </button>
                      </div>
                    ) : (
                      'not my turn'
                    )
                  ) : (
                    <div>
                      <h1>Game Over!</h1>
                      <Link to="/lobby">
                        <button type="submit" className="buttonStyle2">
                          Back to Lobby?a
                        </button>
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <button
                    type="submit"
                    onClick={() => props.hurtByDraw(props.player)}
                  >
                    Draw Card Button
                  </button>
                  {!props.isFinished ? (
                    props.canDraw ? (
                      <div id="buttonContainer">
                        <button
                          disabled={!props.gameState.data.isMyTurn}
                          className="buttonStyle3"
                          type="submit"
                          style={{marginTop: '-4vh'}}
                          onClick={() => {
                            // if (props.timeout) clearTimeout(props.timeout)
                            console.log('saving gameState', props.gameState)
                            props.endTurn(
                              props.gameId,
                              props.gameState,
                              props.player,
                              props.user
                            )

                            window.KEY = Math.random()
                          }}
                        >
                          <p className="buttonText">End Turn</p>
                        </button>
                      </div>
                    ) : (
                      'not my turn'
                    )
                  ) : (
                    <div>
                      <h1>Game Over!</h1>
                      <Link to="/lobby">
                        <button type="submit" className="buttonStyle2">
                          Back to Lobby?
                        </button>
                      </Link>
                    </div>
                  )}
                </div>
              )
            ) : (
              <div style={{paddingLeft: '3vh'}}>
                <button
                  className="buttonStyle4"
                  type="submit"
                  value="disable"
                  // onClick={() => props.drawCard(props.player.deck)}
                >
                  <p className="buttonText">Draw Card</p>
                </button>
                {!props.isFinished ? (
                  <div id="buttonContainer">
                    <button
                      disabled={!props.gameState.data.isMyTurn}
                      className="buttonStyle4"
                      type="submit"
                      style={{marginTop: '-4vh'}}
                      onClick={() => {
                        // if (props.timeout) clearTimeout(props.timeout)
                        props.endTurn(
                          props.gameId,
                          props.gameState,
                          props.player,
                          props.user
                        )

                        window.KEY = Math.random()
                      }}
                    >
                      <p className="buttonText">End Turn</p>
                    </button>
                  </div>
                ) : (
                  <div>
                    <h1>Game Over!</h1>
                    <Link to="/lobby">
                      <button type="submit" className="buttonStyle2">
                        Back to Lobby?
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            )}
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <div></div>
              <Chat />
            </div>
          </div>
          <div
            className="hand"
            style={{display: 'flex', justifyContent: 'center'}}
          >
            <Player
              imgUrl={props.side.heroUrl}
              player={props.player}
              side="bottom"
            />
            <div
              className="hand"
              style={{paddingTop: '2vh', paddingBottom: '2vh'}}
            >
              {props.hand.map(card => {
                return (
                  <Draw key={card._id}>
                    <Card
                      card={card}
                      key={card._id}
                      player="hero"
                      inHand={true}
                    />
                  </Draw>
                )
              })}
            </div>
            <p className="heroText">
              Deck: {props.player.deck.length} cards left.
            </p>
          </div>
          <div>
            {props.user.selectedClass === 'Cultist' && (
              <button
                type="submit"
                onClick={() => {
                  props.cultistDraw(props.player.deck, props.player)
                }}
              >
                Cultist Draw Card
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = function(state) {
  return {
    isFinished: state.game.data.isFinished,
    inPlay: state.game.player.inPlay,
    opponentInPlay: state.game.opponent.inPlay,
    opponentDeck: state.game.opponent.deck,
    hand: state.game.player.hand,
    opponent: state.game.opponent,
    gameState: state.game,
    player: state.game.player,
    planeFull: state.game.player.planeFull,
    canDraw: state.game.data.localTurn,
    user: state.user,
    isMyTurn: state.game.data.isMyTurn
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    playCard: (hero, card) => dispatch(playerPlayCard(hero, card)),
    drawCard: (deck, user) => dispatch(playerDrawCard(deck, user)),
    hurtByDraw: hero => dispatch(hurtByTheDraw(hero)),
    endTurn: (id, gameState, hero, user) => {
      dispatch(endTurn())
      dispatch(incrementTheSettlers(hero, user))
      dispatch(
        saveGame(id, {
          ...gameState,
          player: {...gameState.player, drawsThisTurn: 0},
          data: {...gameState.data, isMyTurn: false}
        })
      )
      socket.emit('end turn', {roomId: localStorage.roomId})
    },
    cultistDraw: (deck, player) => dispatch(cultistDrawCard(deck, player))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Side)
