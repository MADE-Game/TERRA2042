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
  startTurn,
  incrementTheSettlers
} from '../store/thunksAndActionCreators'
import {socket} from './Room'
import {withRouter} from 'react-router'
import PropTypes from 'prop-types'

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
    socket.emit('join', {roomId: this.props.match.params.roomId})
    socket.on('play card', () => {
      setTimeout(
        function() {
          this.props.loadGame(this.props.match.params.id)
        }.bind(this),
        STUTTER
      )
    })
    socket.on('end turn', () => {
      setTimeout(
        function() {
          this.props.loadGame(this.props.match.params.id)
        }.bind(this),
        STUTTER
      )
    })
    socket.on('game over', () => {
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

  render() {
    return (
      <DndProvider backend={Backend}>
        <div className="board">
          <div className="container">
            <Side top={true} side={enemySide} />
            <Side side={playerSide} gameId={this.props.match.params.id} />
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
    player: state.game.player
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getAllCards: () => dispatch(getAllCards()),
    loadGame: id => dispatch(loadGame(id)),
    endTurn: async (id, gameState, hero) => {
      await dispatch(endTurn())
      await dispatch(incrementTheSettlers(hero))
      await dispatch(
        saveGame(id, {...gameState, data: {...gameState.data, isMyTurn: false}})
      )
      socket.emit('end turn')
    },
    saveGame: (id, gameState) => dispatch(saveGame(id, gameState)),
    startTurn: () => dispatch(startTurn())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Board))
