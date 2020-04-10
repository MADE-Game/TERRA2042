/* eslint-disable complexity */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {socket} from './Room'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

class Chat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: this.props.userName,
      message: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.log = this.log.bind(this)
  }

  componentDidMount() {
    if (localStorage.log) {
      document.getElementById('msg').innerHTML = localStorage.log
    }

    socket.on('send msg', data => {
      this.log('send msg', data)
    })

    socket.on('alert chat', data => {
      toast.info(`${data.user} sent you a message!`, {
        position: toast.POSITION.BOTTOM_RIGHT
      })
    })

    socket.on('play card', data => {
      this.log('play card', data)
    })

    socket.on('attack', data => {
      this.log('attack', data)
    })

    socket.on('hero attacked', () => {
      this.log('hero attacked')
    })

    socket.on('draw card', () => {
      this.log('draw card')
    })

    socket.on('end turn', () => {
      this.log('end turn')
    })

    let chat = document.getElementById('msg')
    chat.scrollTop = chat.scrollHeight
  }

  componentWillUnmount() {
    delete localStorage.log
    socket.removeAllListeners()
  }

  log(action, data = null) {
    const display = document.getElementById('msg')
    const message =
      action === 'send msg'
        ? document.createElement('p')
        : document.createElement('span')

    switch (action) {
      case 'send msg':
        message.innerText = `${data.user}: ${data.message}`
        break
      case 'play card':
        message.innerText = `${data.card.name} was played!\n${data.card.attack} attack points\n${data.card.health} defense points`
        break
      case 'attack':
        message.innerText = `${data.attacker.name} attacked ${data.defender.name}!`
        break
      case 'hero attacked':
        message.innerText = 'Your hero was attacked!'
        break
      case 'draw card':
        message.innerText = 'Opponent drew a card'
        break
      case 'end turn':
        message.innerText = 'Opponent ended their turn'
        break
      default:
    }

    if (message.tagName === 'SPAN') message.style.display = 'block'

    display.appendChild(message)
    localStorage.log = display.innerHTML
    display.scrollTop = display.scrollHeight
  }

  handleSubmit(event) {
    event.preventDefault()
    socket.emit('send msg', {
      message: this.state.message,
      user: this.state.userName,
      roomId: localStorage.roomId
    })

    socket.emit('alert chat')

    this.setState({
      message: ''
    })
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  render() {
    return (
      <div id="chatContainer">
        <div id="chat">
          <form onSubmit={this.handleSubmit}>
            <div id="msg" />
            <textarea
              required
              style={{
                resize: 'none',
                borderRadius: '5px',
                border: 0,
                margin: 0,
                width: '97%'
              }}
              rows="3"
              name="message"
              value={this.state.message}
              placeholder="message"
              onChange={this.handleChange}
              onKeyDown={event => {
                if (event.key === 'Enter' && /\S/.test(event.target.value))
                  this.handleSubmit(event)
              }}
            ></textarea>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    userName: state.user.userName
  }
}

export default connect(mapStateToProps)(Chat)
