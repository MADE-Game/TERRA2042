/* eslint-disable no-alert */
import React from 'react'
import {Link} from 'react-router-dom'
import mainSocket from '../socket'
mainSocket.disconnect()

export const Games = () => {
  return (
    <div>
      <h1>Games</h1>
      <Link to="/games/rooms/1">
        <button type="button">Join Game room #1</button>
      </Link>
      <Link to="/games/rooms/2">
        <button type="button">Join Game room #2</button>
      </Link>
    </div>
  )
}
