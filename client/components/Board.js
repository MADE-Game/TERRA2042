import React from 'react'
import Side from './Side'
import {DndProvider} from 'react-dnd'
import Backend from 'react-dnd-html5-backend'

const dummyProps = {
  name: 'Test',
  imageUrl: 'favicon.ico',
  attack: 1,
  defense: 4
}
const enemySide = {
  inPlay: [dummyProps, dummyProps],
  hand: [dummyProps],
  heroUrl: 'favicon.ico'
}
const playerSide = {
  inPlay: [dummyProps, dummyProps, dummyProps],
  hand: [dummyProps, dummyProps],
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
