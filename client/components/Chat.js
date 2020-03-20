import React from 'react'
import io from 'socket.io-client'
const socket = io()

socket.on('send msg', data => console.log(data.message))

export default class Chat extends React.Component {
  constructor() {
    super()
    this.state = {
      userName: '',
      message: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit() {
    socket.emit('send msg', {message: this.state.message})
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  render() {
    return (
      <div>
        <form>
          <div id="msg"></div>
          <input
            name="userName"
            value={this.state.userName}
            onChange={this.handleChange}
            type="text"
            placeholder="user name"
          ></input>
          <br />
          <textarea
            name="message"
            value={this.state.message}
            onChange={this.handleChange}
            placeholder="message"
          ></textarea>
          <br />
          <button type="submit" onSubmit={this.handleSubmit}>
            Send
          </button>
        </form>
      </div>
    )
  }
}
