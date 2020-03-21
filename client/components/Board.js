import React from 'react'
import Side from './Side'
import {DndProvider} from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
import {connect} from 'react-redux'
import {getAllCards} from '../store/thunksAndActionCreators'

import io from 'socket.io-client'
const socket = io()

const dummyProps = {
  name: 'Test',
  imageUrl: '/images/monsters/1.png',
  attack: 1,
  defense: 4,
  cost: 1,
  id: 1
}
const dummyProps2 = {
  name: 'Test',
  imageUrl: '/images/monsters/3.png',
  attack: 1,
  defense: 4,
  cost: 1,
  id: 2
}
const dummyProps3 = {
  name: 'Test',
  imageUrl: '/images/monsters/4.png',
  attack: 1,
  defense: 4,
  cost: 1,
  id: 3
}
const dummyProps4 = {
  name: 'Test',
  imageUrl: '/images/monsters/2.png',
  attack: 1,
  defense: 4,
  cost: 1,
  id: 4
}

const enemySide = {
  inPlay: [
    {...dummyProps, id: 10},
    {...dummyProps3, id: 11}
  ],
  hand: [{...dummyProps, id: 14}],
  heroUrl: '/images/monsters/11.png'
}
const playerSide = {
  inPlay: [dummyProps3, dummyProps4],
  hand: [dummyProps, dummyProps2],
  heroUrl: '/images/monsters/14.png'
}

class Board extends React.Component {
  componentDidMount() {
    this.props.getAllCards()
  }
  render() {
    return (
      <DndProvider backend={Backend}>
        {!this.props.isFinished ? (
          <div className="board">
            ENEMY SIDE:
            <Side side={enemySide} top={true} />
            PLAYER SIDE:
            <button type="button">End Turn</button>
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
    cards: state.game.cards
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getAllCards: () => dispatch(getAllCards())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board)
