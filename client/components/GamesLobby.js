/* eslint-disable no-alert */
import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export class GamesLobby extends Component {
  constructor() {
    super()
    this.state = {
      roomId: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      roomId: event.target.value
    })
  }
  handleSubmit(e) {
    this.props.history.push(`/games/rooms/${this.state.roomId}`)
  }
  render() {
    return (
      <div>
        <h1>Welcome to the lobby!</h1>
        <Link to={`/games/rooms/${Math.floor(Math.random() * 1000000)}`}>
          <button type="button">Create Game Room</button>
        </Link>
        <hr />
        <form onSubmit={this.handleSubmit}>
          <input
            name="room"
            value={this.state.roomId}
            onChange={this.handleChange}
            onSubmit={this.handleSubmit}
          />
        </form>
        <Link to={`/games/rooms/${this.state.roomId}`}>
          <button type="button">Join Game Room</button>
        </Link>
        <p>
          I think this is a good place to be able to pick your deck and class!
        </p>
      </div>
    )
  }
}
