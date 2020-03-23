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

import io from 'socket.io-client'
const socket = io()

const enemySide = {
  heroUrl: '/images/monsters/11.png'
}
const playerSide = {
  heroUrl: '/images/monsters/14.png'
}

class Board extends React.Component {
  async componentDidMount() {
    console.log('props', this.props)
    await this.props.loadGame(this.props.match.params.id)
    //this line is for testing, and initializes the players deck with all the cards in the database.
    if (this.props.gameState.player.deck.length === 0) this.props.getAllCards()
  }
  componentDidUpdate() {
    this.props.saveGame(this.props.match.params.id, this.props.gameState)
  }
  render() {
    return (
      <DndProvider backend={Backend}>
        {!this.props.isFinished ? (
          <div className="board">
            ENEMY SIDE:
            <Side top={true} side={enemySide} />
            PLAYER SIDE:
            <button type="button" onClick={this.props.endTurn}>
              End Turn
            </button>
            <Side side={playerSide} />
          </div>
        ) : (
          <h1>Game Over!</h1>
        )}
      </DndProvider>
    )
  }
}

socket.on('play card', data => {
  // eslint-disable-next-line no-alert
  alert(
    `${data.name} was played!\n${data.attack} attack points\n${data.defense} defense points`
  )
})

socket.on('attack', data => {
  // eslint-disable-next-line no-alert
  alert(`${data.attacker.name} attacked ${data.defender.name}!`)
})

socket.on('draw card', () => {
  // eslint-disable-next-line no-alert
  alert('A card was drawn!')
})

const mapStateToProps = state => {
  return {
    isFinished: state.game.data.isFinished,
    cards: state.game.cards,
    inPlay: state.game.player.inPlay,
    gameState: state.game
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
