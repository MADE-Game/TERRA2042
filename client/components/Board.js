import React from 'react'
import Side from './Side'
import {DndProvider} from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {
  getAllCards,
  loadGame,
  endTurn,
  saveGame,
  startTurn
} from '../store/thunksAndActionCreators'
import {socket} from './Room'

//used for slightly delaying socket speed prior to save.
const STUTTER = 25

const enemySide = {
  heroUrl: '/images/monsters/11.png'
}
const playerSide = {
  heroUrl: '/images/monsters/14.png'
}
class Board extends React.Component {
  componentDidMount() {
    socket.emit('join', {roomId: this.props.match.params.roomId})
    socket.on('play card', data => {
      console.log(
        `${data.name} was played!\n${data.attack} attack points\n${data.health} defense points`
      )
      setTimeout(
        function() {
          this.props.loadGame(this.props.match.params.id)
        }.bind(this),
        STUTTER
      )
    })
    socket.on('end turn', data => {
      console.log('turn ended..')
      setTimeout(
        function() {
          this.props.loadGame(this.props.match.params.id)
        }.bind(this),
        STUTTER
      )
    })
    socket.on('game over', data => {
      console.log('game over!')
      setTimeout(
        function() {
          this.props.loadGame(this.props.match.params.id)
        }.bind(this),
        STUTTER
      )
    })

    socket.on('attack', data => {
      console.log(`${data.attacker.name} attacked ${data.defender.name}!`)
      setTimeout(
        function() {
          this.props.loadGame(this.props.match.params.id)
        }.bind(this),
        STUTTER
      )
    })

    socket.on('draw card', () => {
      console.log('A card was drawn!')
      setTimeout(
        function() {
          this.props.loadGame(this.props.match.params.id)
        }.bind(this),
        STUTTER
      )
    })

    this.props.loadGame(this.props.match.params.id)
  }

  async componentDidUpdate() {
    if (this.props.canEnd)
      await this.props.saveGame(
        this.props.match.params.id,
        this.props.gameState
      )
  }

  render() {
    return (
      <DndProvider backend={Backend}>
        <div className="board">
          ENEMY SIDE:
          <Side top={true} side={enemySide} />
          PLAYER SIDE:
          {!this.props.isFinished ? (
            this.props.isMyTurn ? (
              <div id="buttonContainer">
                <button
                  type="submit"
                  onClick={() =>
                    this.props.endTurn(
                      this.props.match.params.id,
                      this.props.gameState
                    )
                  }
                  className="turnButton"
                >
                  End Turn
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
          <Side side={playerSide} />
        </div>
      </DndProvider>
    )
  }
}

const mapStateToProps = state => {
  return {
    isFinished: state.game.data.isFinished,
    cards: state.game.cards,
    inPlay: state.game.player.inPlay,
    gameState: state.game,
    isMyTurn: state.game.data.localTurn,
    canEnd: state.game.data.isMyTurn
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getAllCards: () => dispatch(getAllCards()),
    loadGame: id => dispatch(loadGame(id)),
    endTurn: async (id, gameState) => {
      await dispatch(
        saveGame(id, {...gameState, data: {...gameState.data, isMyTurn: false}})
      )
      dispatch(endTurn())
      socket.emit('end turn')
    },
    saveGame: (id, gameState) => dispatch(saveGame(id, gameState)),
    startTurn: () => dispatch(startTurn())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board)
