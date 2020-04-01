import React, {Component} from 'react'
import Side from './Side'
import {DndProvider} from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
import {connect} from 'react-redux'
import {
  getAllCards,
  loadGame,
  saveGame,
  startTurn,
  clearBoard,
  endTurn
} from '../store/thunksAndActionCreators'
import {socket} from './Room'
import {withRouter} from 'react-router'
import PropTypes from 'prop-types'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

//used for slightly delaying socket speed prior to save.
const STUTTER = 25

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
    if (!localStorage.gameId) {
      localStorage.gameId = this.props.match.params.id
      localStorage.roomId = this.props.match.params.roomId
    }

    socket.emit('join', {
      roomId: this.props.match.params.roomId
    })

    socket.emit('player joined', {
      playerName: this.props.playerName,
      roomId: this.props.match.params.roomId
    })

    socket.on('play card', () => {
      setTimeout(
        function() {
          this.props.loadGame(this.props.match.params.id)
        }.bind(this),
        STUTTER
      )
    })

    socket.on('left game', data => {
      toast.info(`${data.playerName} has left the game`, {
        position: toast.POSITION.TOP_CENTER
      })
    })

    socket.on('player joined', data => {
      toast.info(`${data.playerName} has entered the game`, {
        position: toast.POSITION.TOP_CENTER
      })
    })

    socket.on('end turn', () => {
      setTimeout(
        function() {
          this.props.loadGame(this.props.match.params.id)
        }.bind(this),
        STUTTER
      )

      toast.info("It's your turn!", {
        position: toast.POSITION.TOP_CENTER
      })

      this.timeout = setTimeout(() => {
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
      }, 20000)
    })

    socket.on('game over', () => {
      setTimeout(
        function() {
          this.props.loadGame(this.props.match.params.id)
        }.bind(this),
        STUTTER
      )

      delete localStorage.gameId
      delete localStorage.roomId
    })

    socket.on('hero attacked', () => {
      setTimeout(
        function() {
          this.props.loadGame(this.props.match.params.id)
        }.bind(this),
        STUTTER
      )
    })

    socket.on('attack', () => {
      setTimeout(
        function() {
          this.props.loadGame(this.props.match.params.id)
        }.bind(this),
        STUTTER
      )
    })

    socket.on('draw card', () => {
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

  componentWillUnmount() {
    socket.removeAllListeners()
    this.props.clearBoard()
  }

  render() {
    return (
      <DndProvider backend={Backend}>
        <div className="board">
          <div className="container">
            <Side top={true} side={enemySide} timeout={this.timeout} />
            <Side
              side={playerSide}
              gameId={this.props.match.params.id}
              timeout={this.timeout}
            />
          </div>
        </div>
      </DndProvider>
    )
  }
}

const mapStateToProps = state => {
  return {
    cards: state.game.cards,
    inPlay: state.game.player.inPlay,
    gameState: state.game,
    isMyTurn: state.game.data.localTurn,
    canEnd: state.game.data.isMyTurn,
    player: state.game.player,
    playerName: state.user.userName
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllCards: () => dispatch(getAllCards()),
    loadGame: id => dispatch(loadGame(id)),
    saveGame: (id, gameState) => dispatch(saveGame(id, gameState)),
    startTurn: () => dispatch(startTurn()),
    clearBoard: () => dispatch(clearBoard()),
    forfeitTurn: (gameId, gameState) => {
      dispatch(endTurn())
      dispatch(
        saveGame(gameId, {
          ...gameState,
          data: {...gameState.data, isMyTurn: false}
        })
      )
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Board))
