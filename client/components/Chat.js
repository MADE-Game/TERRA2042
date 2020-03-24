import React from 'react'
import Board from './Board'
import {socket} from './Games'

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

  handleSubmit(event) {
    event.preventDefault()
    socket.emit('send msg', {
      message: this.state.message,
      user: this.state.userName
    })
    this.setState({
      message: ''
    })
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  render() {
    return (
      <div>
        <Board />
        <form onSubmit={this.handleSubmit}>
          <div id="msg"></div>
          <br />
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
          <button type="submit">Send</button>
        </form>
      </div>
    )
  }
}

socket.on('send msg', data => {
  const display = document.getElementById('msg')
  const message = document.createElement('p')
  message.innerText = `${data.user}: ${data.message}`
  display.appendChild(message)
})
