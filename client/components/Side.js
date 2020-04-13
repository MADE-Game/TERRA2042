/* eslint-disable complexity */
import React from 'react'
import Card from './Card'
import Plane from './Plane'
import {MyButton as Button} from './Button'
import {MyIconButton as IconButton} from './IconButton'
import BanditComponent from './BanditComponent'
import {
  endTurn,
  playerPlayCard,
  playerDrawCard,
  saveGame,
  incrementTheSettlers,
  hurtByTheDraw,
  cultistDrawCard,
  metalHeadSummon,
  engagedHeal
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
import {renderTime} from '../timeRender'

const Draw = styled.div`
  animation: 1s ${keyframes`${zoomInLeft}`};
`

// eslint-disable-next-line complexity
class Side extends React.Component {
  // eslint-disable-next-line complexity
  constructor() {
    super()
    this.state = {
      opponentClass: ''
    }
  }

  componentDidMount() {
    if (localStorage.roomId) {
      socket.emit('exchange class', {
        roomId: localStorage.roomId,
        class: this.props.user.selectedClass
      })
    }

    socket.on('exchange class', data => {
      this.setState({opponentClass: data.class})
      console.log('opponents class here->>>>>>>', data.class)
    })
  }

  handleClick() {
    this.props.drawCard(this.props.player.deck, this.props.user)
  }
  render() {
    // console.log('props in side',this.props)
    // console.log(this.state)
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
                    playerName={this.props.user.userName}
                    text={this.props.isFinished ? 'Game Over' : 'Home'}
                    color="default"
                    icon="home2"
                    history={this.props.history}
                  />
                </a>
                <div style={{marginLeft: '2vh'}}>
                  <div
                    style={{
                      filter: 'drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.75))'
                    }}
                  >
                    <CountdownCircleTimer
                      id="timer"
                      size={50}
                      strokeWidth={5}
                      trailColor="rgba(99, 14, 14, 0.25)"
                      strokeLinecap="square"
                      onComplete={() => {
                        if (this.props.isMyTurn) {
                          this.props.forfeitTurn(
                            localStorage.gameId,
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
                      durationSeconds={60}
                      renderTime={renderTime}
                      isLinearGradient
                      colors={[['#D38411', 0.9], ['#630E0E']]}
                      key={window.KEY}
                    />
                  </div>
                </div>
              </div>
              <div
                style={{
                  paddingRight: '5vh',
                  display: 'flex',
                  flexDirection: 'row-reverse'
                }}
              >
                <Player
                  imgUrl={this.props.opponent.class}
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
              healEngaged={this.props.healEngaged}
            />
            <div
              className="hand"
              style={{display: 'flex', justifyContent: 'center'}}
            >
              <div
                className="hand"
                style={{
                  paddingTop: '2vh',
                  paddingBottom: '2vh',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%',
                  paddingLeft: '3vh',
                  paddingRight: '3vh'
                }}
              >
                <div style={{display: 'flex', flexDirection: 'row'}}>
                  <Player
                    imgUrl={this.state.opponentClass}
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
                </div>
                <Chat />
              </div>
            </div>

            <div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  marginLeft: '3vh',
                  marginTop: '-5vh'
                }}
              >
                {this.props.isMyTurn === true &&
                  (this.props.allowedToDraw ? (
                    <IconButton
                      text="canDraw"
                      drawCard={this.props.drawCard}
                      player={{deck: this.props.player.deck}}
                      user={this.props.user}
                    />
                  ) : (
                    // <IconButton text="cantDraw"/>
                    ''
                  ))}

                {this.props.isMyTurn ? (
                  <IconButton
                    text="endTurn"
                    endTurn={this.props.endTurn}
                    user={this.props.user}
                    player={this.props.player}
                    gameId={this.props.gameId}
                    gameState={this.props.gameState}
                  />
                ) : (
                  <IconButton text="cantEnd" />
                )}

                {this.props.user.selectedClass === 'Cultist' &&
                  (this.props.isMyTurn ? (
                    <button
                      type="submit"
                      className="buttonStyle3"
                      onClick={() => {
                        if (this.props.canDraw) {
                          this.props.cultistDraw(
                            this.props.player.deck,
                            this.props.player
                          )
                        } else {
                          toast.warning('Not your turn!', {
                            position: toast.POSITION.TOP_CENTER
                          })
                        }
                      }}
                    >
                      Cultist Draw Card
                    </button>
                  ) : (
                    <button type="submit" className="buttonStyle4">
                      Cultist Draw Card
                    </button>
                  ))}
                {/* good */}
                {this.props.user.selectedClass === 'Metalhead' &&
                  (this.props.isMyTurn ? (
                    <button
                      type="submit"
                      className="buttonStyle3"
                      onClick={() => {
                        if (this.props.canDraw) {
                          if (!this.props.metalHeadUsed) {
                            this.props.metalHeadSummon(this.props.player)
                          } else {
                            toast.warning(
                              'You can only use Metalhead power once per turn',
                              {
                                position: toast.POSITION.TOP_CENTER
                              }
                            )
                          }
                        } else {
                          toast.warning('Not your turn!', {
                            position: toast.POSITION.TOP_CENTER
                          })
                        }
                      }}
                    >
                      Metalhead Power
                    </button>
                  ) : (
                    <button type="submit" className="buttonStyle4">
                      Metalhead Power
                    </button>
                  ))}
                {this.props.user.selectedClass === 'Medic' &&
                  (this.props.isMyTurn ? (
                    <button
                      type="submit"
                      className="buttonStyle3"
                      onClick={() => {
                        if (this.props.canDraw) {
                          this.props.engagedHeal()
                        } else {
                          toast.warning('Not your turn!', {
                            position: toast.POSITION.TOP_CENTER
                          })
                        }
                      }}
                    >
                      Medic Heal Power
                    </button>
                  ) : (
                    <button type="submit" className="buttonStyle4">
                      Medic Heal Power
                    </button>
                  ))}
                {this.props.user.selectedClass === 'Bandit' && (
                  <div>
                    <BanditComponent />
                  </div>
                )}
              </div>
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
    allowedToDraw:
      state.game.player.drawsThisTurn < state.game.player.drawLimit,
    healEngaged: state.game.player.healEngaged
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
          player: {
            ...gameState.player,
            drawsThisTurn: 0,
            cultistHasDrawn: false,
            healUsed: false,
            banditUsed: false,
            banditAttackEngaged: false,
            metalHeadUsed: false,
            healEngaged: false
          },
          data: {...gameState.data, isMyTurn: false}
        })
      )
      socket.emit('end turn', {roomId: localStorage.roomId})
    },
    cultistDraw: (deck, player) => dispatch(cultistDrawCard(deck, player)),
    forfeitTurn: async (gameId, gameState) => {
      dispatch(endTurn())
      dispatch(
        saveGame(gameId, {
          ...gameState,
          player: {
            ...gameState.player,
            drawsThisTurn: 0,
            cultistHasDrawn: false,
            healUsed: false,
            banditUsed: false,
            banditAttackEngaged: false,
            metalHeadUsed: false,
            healEngaged: false
          },
          data: {...gameState.data, isMyTurn: false}
        })
      )
    },
    metalHeadSummon: fighter => dispatch(metalHeadSummon(fighter)),
    engagedHeal: () => dispatch(engagedHeal())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Side)
