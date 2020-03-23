/* eslint-disable no-alert */
import React from 'react'
import {Link} from 'react-router-dom'
import io from 'socket.io-client'
import mainSocket from '../socket'
mainSocket.disconnect()
export const socket = io('/games')

export const Games = () => {
  socket.emit('welcome')
  socket.on('welcome', () => alert('welcome to the games lobby'))
  socket.on('join', data => {
    alert(`you have joined romm #${data.id}`)
  })
  return (
    <div>
      <h1>Games</h1>
      <Link to="/games/room/1">
        <button type="button" onClick={() => socket.emit('join', {id: 1})}>
          Join Game room #1
        </button>
      </Link>
    </div>
  )
}
