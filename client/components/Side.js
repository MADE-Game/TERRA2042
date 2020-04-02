import React from 'react'
import Card from './Card'
import Plane from './Plane'
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

// eslint-disable-next-line complexity
class Side extends React.Component {
  constructor() {
    super()
    this.state = {healEngaged: false}
  }

  // eslint-disable-next-line complexity
  render() {
    return (
      <div className="side">
        {/* player or opponent boolean check */}
        {this.props.top ? (
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
                imgUrl={this.props.side.heroUrl}
                player={this.props.opponent}
                side="top"
              />
              <p className="heroText">
                Deck: {this.props.opponent.deck} cards left.
              </p>
              <p className="heroText">
                Opponent hand size is:{this.props.opponent.hand}
              </p>
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

            <div style={{display: 'flex', flexDirection: 'column-reverse'}}>
              {/* boolean that checks whether or not its the players turn */}
              {this.props.canDraw ? (
                /* boolean that checks whether or not the player has cards in their deck */
                this.props.player.deck.length ? (
                  //if they have cards in their deck
                  <div style={{paddingLeft: '3vh'}}>
                    <button
                      className="buttonStyle3"
                      type="submit"
                      onClick={() =>
                        this.props.drawCard(
                          this.props.player.deck,
                          this.props.user
                        )
                      }
                    >
                      <p className="buttonText">Draw Card</p>
                    </button>
                    {/* boolean that checks whether or not the player has finished their turn */}
                    {!this.props.isFinished ? (
                      /* boolean that checks whether or not the player has drawn a card this turn */
                      this.props.canDraw ? (
                        //if the player hasn't drawn a card
                        <div id="buttonContainer">
                          <button
                            className="buttonStyle3"
                            type="submit"
                            style={{marginTop: '-4vh'}}
                            onClick={() =>
                              this.props.endTurn(
                                this.props.gameId,
                                this.props.gameState,
                                this.props.player,
                                this.props.user
                              )
                            }
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
                      onClick={() => this.props.hurtByDraw(this.props.player)}
                    >
                      Draw Card Button
                    </button>
                    {!this.props.isFinished ? (
                      this.props.canDraw ? (
                        <div id="buttonContainer">
                          <button
                            className="buttonStyle3"
                            type="submit"
                            style={{marginTop: '-4vh'}}
                            onClick={() =>
                              this.props.endTurn(
                                this.props.gameId,
                                this.props.gameState,
                                this.props.player,
                                this.props.user
                              )
                            }
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
                  {!this.props.isFinished ? (
                    <div id="buttonContainer">
                      <button
                        className="buttonStyle4"
                        type="submit"
                        style={{marginTop: '-4vh'}}
                        onClick={() => {
                          this.props.endTurn(
                            this.props.gameId,
                            this.props.gameState,
                            this.props.player,
                            this.props.user
                          )
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
                imgUrl={this.props.side.heroUrl}
                player={this.props.player}
                side="bottom"
              />
              <div
                className="hand"
                style={{paddingTop: '2vh', paddingBottom: '2vh'}}
              >
                {this.props.hand.map(card => {
                  return (
                    <Card
                      card={card}
                      key={card._id}
                      player="hero"
                      inHand={true}
                    />
                  )
                })}
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
    metalHeadUsed: state.game.player.metalHeadUsed
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    playCard: (hero, card) => dispatch(playerPlayCard(hero, card)),
    drawCard: (deck, user) => dispatch(playerDrawCard(deck, user)),
    hurtByDraw: hero => dispatch(hurtByTheDraw(hero)),
    endTurn: async (id, gameState, hero, user) => {
      console.log('log in mapDispatch', id, gameState, hero, user)
      await dispatch(endTurn())
      await dispatch(incrementTheSettlers(hero, user))
      await dispatch(
        saveGame(id, {...gameState, data: {...gameState.data, isMyTurn: false}})
      )
      socket.emit('end turn')
    },
    cultistDraw: (deck, player) => dispatch(cultistDrawCard(deck, player)),
    metalHeadSummon: fighter => dispatch(metalHeadSummon(fighter))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Side)
