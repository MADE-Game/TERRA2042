import React from 'react'
import Card from './Card'
import Plane from './Plane'
import {MyButton as Button} from './Button'
import BanditComponent from './BanditComponent'
import {
  endTurn,
  playerPlayCard,
  playerDrawCard,
  saveGame,
  incrementTheSettlers,
  hurtByTheDraw,
  cultistDrawCard,
  metalHeadSummon
} from '../store/thunksAndActionCreators'
import Chat from './Chat'
import {Link} from 'react-router-dom'
import {socket} from './Room'
import {connect} from 'react-redux'
import Player from './Player'
import {zoomInLeft} from 'react-animations'
import styled, {keyframes} from 'styled-components'
import {toast} from 'react-toastify'
import {CountdownCircleTimer} from 'react-countdown-circle-timer'

const Draw = styled.div`
  animation: 1s ${keyframes`${zoomInLeft}`};
`

// eslint-disable-next-line complexity
class Side extends React.Component {
  constructor() {
    super()
    this.state = {healEngaged: false}
  }

  // eslint-disable-next-line complexity
  render() {
    console.log(this.props.history)
    return (
      <div className="side">
        {/* player or opponent boolean check */}
        {this.props.top ? (
          // if props.top is defined aka opponent side
          <div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: '2vh'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignSelf: 'flex-start',
                  paddingLeft: '2vh'
                }}
              >
                <a>
                  <Button
                    text="Home"
                    color="default"
                    icon="home2"
                    history={this.props.history}
                  />
                </a>
                <div style={{marginLeft: '2vh'}}>
                  <CountdownCircleTimer
                    size={50}
                    strokeWidth={5}
                    trailColor="black"
                    onComplete={() => {
                      if (this.props.isMyTurn) {
                        this.props.forfeitTurn(
                          this.props.match.params.id,
                          this.props.gameState
                        )
                        socket.emit('end turn', {roomId: localStorage.roomId})
                        toast.error('You forfeited your turn!', {
                          position: toast.POSITION.TOP_CENTER
                        })
                      }

                      window.KEY = Math.random()
                    }}
                    isPlaying={this.props.isMyTurn}
                    durationSeconds={30}
                    colors={[['#004777', 0.33], ['#F7B801', 0.33], ['#A30000']]}
                    key={window.KEY}
                  />
                </div>
              </div>
              <div style={{paddingRight: '2vh'}}>
                <Player
                  imgUrl={this.props.side.heroUrl}
                  player={this.props.opponent}
                  side="top"
                  size={this.props.opponent.hand}
                />
              </div>
            </div>
            <Plane
              inPlay={this.props.opponentInPlay}
              playCard={card => this.props.playCard(this.props.opponent, card)}
              player="enemy"
              className="planeStyle"
            />
          </div>
        ) : (
          // if props.top is undefined aka player side
          <div style={{borderTop: '2px dashed #5f1d18'}}>
            <Plane
              inPlay={this.props.inPlay}
              playCard={card => this.props.playCard(this.props.player, card)}
              player="hero"
              planeFull={this.props.planeFull}
              healEngaged={this.state.healEngaged}
            />

            <div style={{display: 'flex', flexDirection: 'column'}}>
              {/* boolean that checks whether or not its the players turn */}
              {this.props.canDraw ? (
                /* boolean that checks whether or not the player has cards in their deck */
                this.props.player.deck.length ? (
                  //if they have cards in their deck
                  <div style={{paddingLeft: '3vh'}}>
                    {/* boolean that checks whether or not the player has finished their turn */}
                    {!this.props.isFinished ? (
                      /* boolean that checks whether or not the player has drawn a card this turn */
                      this.props.canDraw ? (
                        //if the player hasn't drawn a card
                        <div id="buttonContainer">
                          <button
                            className="buttonStyle3"
                            type="submit"
                            onClick={
                              this.props.allowedToDraw
                                ? () => {
                                    this.props.drawCard(
                                      this.props.player.deck,
                                      this.props.user
                                    )
                                  }
                                : () =>
                                    toast.warning(
                                      "You can't draw any more cards this turn!",
                                      {
                                        position: toast.POSITION.TOP_CENTER
                                      }
                                    )
                            }
                          >
                            <p className="buttonText">Draw Card</p>
                          </button>
                          <button
                            disabled={!this.props.gameState.data.isMyTurn}
                            className="buttonStyle3"
                            type="submit"
                            onClick={() => {
                              this.props.endTurn(
                                this.props.gameId,
                                this.props.gameState,
                                this.props.player,
                                this.props.user
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
                ) : (
                  //good--------------------------
                  <div>
                    <button
                      type="submit"
                      onClick={() => this.props.hurtByDraw(this.props.player)}
                    >
                      Draw Card Button
                    </button>
                    {!this.props.isFinished ? (
                      this.props.canDraw ? (
                        <div id="buttonContainer">
                          <button
                            disabled={!this.props.gameState.data.isMyTurn}
                            className="buttonStyle3"
                            type="submit"
                            style={{marginTop: '-4vh'}}
                            onClick={() => {
                              this.props.endTurn(
                                this.props.gameId,
                                this.props.gameState,
                                this.props.player,
                                this.props.user
                              )
                              window.KEY = Math.random()
                            }}
                          >
                            <p className="buttonText">End Turn</p>
                          </button>
                        </div>
                      ) : (
                        //good-----------------------
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
                  {!this.props.isFinished ? (
                    // props.canDraw ? (
                    <div id="buttonContainer">
                      <button
                        disabled={!this.props.gameState.data.isMyTurn}
                        className="buttonStyle3"
                        type="submit"
                        style={{marginTop: '-4vh'}}
                        onClick={() => {
                          // if (props.timeout) clearTimeout(props.timeout
                          this.props.endTurn(
                            this.props.gameId,
                            this.props.gameState,
                            this.props.player,
                            this.props.user
                          )

                          window.KEY = Math.random()
                        }}
                      >
                        <p className="buttonText">End Turn</p>
                      </button>
                    </div>
                  ) : (
                    // ) : (
                    //   'not my turn'
                    // )
                    <div>
                      <h1>Game Over!</h1>
                      <Link to="/lobby">
                        <button type="submit" className="buttonStyle2">
                          Back to Lobby?
                        </button>
                      </Link>
                    </div>
                    // )
                  )}
                  {/* ) */}
                </div>
              )}

              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <div></div>
              </div>
            </div>

            <div
              className="hand"
              style={{display: 'flex', justifyContent: 'center'}}
            >
              <div
                className="hand"
                style={{paddingTop: '2vh', paddingBottom: '2vh'}}
              >
                <Player
                  imgUrl={this.props.side.heroUrl}
                  player={this.props.player}
                  side="bottom"
                />
                {this.props.hand.map(card => {
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
                <Chat />
              </div>
            </div>

            <div>
              {this.props.user.selectedClass === 'Cultist' && (
                <button
                  type="submit"
                  onClick={() => {
                    if (this.props.canDraw) {
                      this.props.cultistDraw(
                        this.props.player.deck,
                        this.props.player
                      )
                    } else {
                      // eslint-disable-next-line no-alert
                      alert('Not your turn!')
                    }
                  }}
                >
                  Cultist Draw Card
                </button>
              )}
              {/* good */}
              {this.props.user.selectedClass === 'Metalhead' && (
                <button
                  type="submit"
                  onClick={() => {
                    if (this.props.canDraw) {
                      if (!this.props.metalHeadUsed) {
                        this.props.metalHeadSummon(this.props.player)
                      } else {
                        // eslint-disable-next-line no-alert
                        alert('You can only use Metalhead power once per turn')
                      }
                    } else {
                      // eslint-disable-next-line no-alert
                      alert('Not your turn!')
                    }
                  }}
                >
                  Metalhead Power
                </button>
              )}
              {this.props.user.selectedClass === 'Medic' && (
                <button
                  type="submit"
                  onClick={() => {
                    if (this.props.canDraw) {
                      console.log('healEngaged')
                      this.setState({healEngaged: true})
                    } else {
                      // eslint-disable-next-line no-alert
                      alert('Not your turn!')
                    }
                  }}
                >
                  Medic Heal Power
                </button>
              )}
              {this.props.user.selectedClass === 'Bandit' && (
                <div>
                  <BanditComponent />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    )
  }
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
    metalHeadUsed: state.game.player.metalHeadUsed,
    isMyTurn: state.game.data.isMyTurn,
    allowedToDraw: state.game.player.drawsThisTurn < state.game.player.drawLimit
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
    cultistDraw: (deck, player) => dispatch(cultistDrawCard(deck, player)),
    metalHeadSummon: fighter => dispatch(metalHeadSummon(fighter))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Side)
