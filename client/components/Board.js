import React from 'react'
import Side from './Side'
import {DndProvider} from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
import {connect} from 'react-redux'
import {
  getAllCards,
  loadGame,
  endTurn,
  saveGame
} from '../store/thunksAndActionCreators'
import {socket} from './Room'

const enemySide = {
  heroUrl: '/images/monsters/11.png'
}
const playerSide = {
  heroUrl: '/images/monsters/14.png'
}
const globalVar = {}
class Board extends React.Component {
  componentDidMount() {
    socket.emit('join', {roomId: this.props.match.params.roomId})
    socket.on('play card', data => {
      console.log(
        `${data.name} was played!\n${data.attack} attack points\n${data.health} defense points`
      )
      this.props.loadGame(this.props.match.params.id)
    })

    socket.on('attack', data => {
      console.log(`${data.attacker.name} attacked ${data.defender.name}!`)
      this.props.loadGame(this.props.match.params.id)
    })

    socket.on('draw card', () => {
      console.log('A card was drawn!')
      this.props.loadGame(this.props.match.params.id)
    })

    this.props.loadGame(this.props.match.params.id)
    //this line is for testing, and initializes the players deck with all the cards in the database.
    if (this.props.gameState.player.deck.length === 0) this.props.getAllCards()
    if (this.props.isMyTurn) {
      this.props.saveGame(this.props.match.params.id, this.props.gameState)
    }
    globalVar.load = () => {
      this.props.loadGame(this.props.match.params.id)
    }
  }
  componentDidUpdate() {
    if (this.props.isMyTurn)
      this.props.saveGame(this.props.match.params.id, this.props.gameState)
  }

  render() {
    console.log('its my turn! ', this.props.isMyTurn)
    return (
      <DndProvider backend={Backend}>
        {!this.props.isFinished ? (
          <div className="board">
            ENEMY SIDE:
            <Side top={true} side={enemySide} />
            PLAYER SIDE:
            {this.props.canEnd ? (
              <div id="buttonContainer">
                <button
                  type="submit"
                  onClick={this.props.endTurn}
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
    endTurn: () => dispatch(endTurn()),
    saveGame: (id, gameState) => dispatch(saveGame(id, gameState))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board)
