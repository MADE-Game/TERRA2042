import React, {Component} from 'react'
import Side from './Side'
import {DndProvider} from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
import {connect} from 'react-redux'
import {
  getAllCards,
  loadGame,
  endTurn,
  saveGame,
  startTurn
} from '../store/thunksAndActionCreators'
import {socket} from './Room'
import {withRouter} from 'react-router'
import PropTypes from 'prop-types'

const enemySide = {
  heroUrl: '/images/monsters/11.png'
}
const playerSide = {
  heroUrl: '/images/monsters/14.png'
}
class Board extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired
  }

  componentDidMount() {
    socket.emit('join', {roomId: this.props.match.params.roomId})
    socket.on('play card', () => {
      this.props.loadGame(this.props.match.params.id)
    })
    socket.on('end turn', () => {
      console.log('turn ended..')
      this.props.loadGame(this.props.match.params.id)
    })

    socket.on('attack', () => {
      this.props.loadGame(this.props.match.params.id)
    })

    socket.on('draw card', () => {
      this.props.loadGame(this.props.match.params.id)
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
        {!this.props.isFinished ? (
          <div className="board">
            ENEMY SIDE:
            <Side top={true} side={enemySide} />
            PLAYER SIDE:
            {this.props.isMyTurn ? (
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
            )}
            <Side side={playerSide} />
          </div>
        ) : (
          <h1>Game Over!</h1>
        )}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Board))
