/* eslint-disable no-alert */
import React from 'react'
import {Link} from 'react-router-dom'
import io from 'socket.io-client'
import mainSocket from '../socket'
mainSocket.disconnect()
export const socket = io('/games')

export const Games = () => {
  return (
    <div>
      <h1>Games</h1>
      <Link to="/games/room/111111111111111111111110">
        <button type="button" onClick={() => socket.emit('join', {id: 1})}>
          Join Game room #1
        </button>
      </Link>
      <Link to="/games/room/111111111111111111111112">
        <button type="button" onClick={() => socket.emit('join', {id: 2})}>
          Join Game room #2
        </button>
      </Link>
    </div>
  )
}
