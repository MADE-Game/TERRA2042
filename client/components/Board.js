import React from 'react'
import Side from './Side'
import {DndProvider} from 'react-dnd'
import Backend from 'react-dnd-html5-backend'

const dummyProps = {
  name: 'Test',
  imageUrl: 'favicon.ico',
  attack: 1,
  defense: 4,
  id: 1
}
const dummyProps2 = {
  name: 'Test',
  imageUrl: 'favicon.ico',
  attack: 1,
  defense: 4,
  id: 2
}
const dummyProps3 = {
  name: 'Test',
  imageUrl: 'favicon.ico',
  attack: 1,
  defense: 4,
  id: 3
}
const dummyProps4 = {
  name: 'Test',
  imageUrl: 'favicon.ico',
  attack: 1,
  defense: 4,
  id: 4
}

const enemySide = {
  inPlay: [dummyProps, dummyProps],
  hand: [dummyProps],
  heroUrl: 'favicon.ico'
}
const playerSide = {
  inPlay: [dummyProps3, dummyProps4],
  hand: [dummyProps, dummyProps2],
  heroUrl: 'favicon.ico'
}
const Board = props => {
  return (
    <DndProvider backend={Backend}>
      <div className="board">
        ENEMY SIDE:
        <Side side={enemySide} top={true} />
        PLAYER SIDE:
        <button type="button">End Turn</button>
        <Side side={playerSide} />
      </div>
    </DndProvider>
  )
}

export default Board
