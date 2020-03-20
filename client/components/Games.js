import React from 'react'
import io from 'socket.io-client'
const socket = io('/games')

export const Games = () => {
  // eslint-disable-next-line no-alert
  socket.on('welcome', () => alert('welcome to the games lobby'))
  return (
    <div>
      <h1>Games</h1>
    </div>
  )
}
