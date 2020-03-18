import React from 'react'
import Side from './Side'
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
    <div className="board">
      ENEMY SIDE:
      <Side side={enemySide} top={true} />
      PLAYER SIDE:
      <button type="button">End Turn</button>
      <Side side={playerSide} />
    </div>
  )
}

export default Board
