/* eslint-disable no-alert */
import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export class Games extends Component {
  constructor() {
    super()
    this.state = {
      roomId: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({
      roomId: event.target.value
    })
  }

  render() {
    return (
      <div>
        <h1>Games</h1>
        <Link to={`/games/rooms/${Math.floor(Math.random() * 1000000)}`}>
          <button type="button">Create Game Room</button>
        </Link>
        <input
          name="room"
          value={this.state.roomId}
          onChange={this.handleChange}
        ></input>
        <Link to={`/games/rooms/${this.state.roomId}`}>
          <button type="button">Join Game Room</button>
        </Link>
      </div>
    )
  }
}
