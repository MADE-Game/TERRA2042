import React, {Component} from 'react'
import axios from 'axios'
import history from '../history'
import io from 'socket.io-client'
export const socket = io('/games')

export default class Room extends Component {
  constructor(props) {
    super(props)
    this.startGame = this.startGame.bind(this)
  }

  async componentDidMount() {
    const {data: user} = await axios.get('/auth/me')

    socket.emit('join', {roomId: this.props.match.params.roomId})
    socket.on('join', data => {
      if (data.numPpl === 2) {
        console.log('emit id exchange') // incog
        socket.emit('id exchange', {
          pId: user._id,
          roomId: this.props.match.params.roomId
        })
      }
    })
    socket.on('id exchange', data => {
      console.log('hurd id exchange') // me
      this.startGame(user._id, data.pId)
    })
    socket.on('game started', data => {
      console.log('hurd game started') // incog
      history.push(
        `/games/rooms/${this.props.match.params.roomId}/game/${data.gameId}`
      )
    })
  }

  async startGame(p1Id, p2Id) {
    console.log('starting game') // me
    const {data: user} = await axios.get('/auth/me')
    const gameObj = {
      game: {
        player1: {
          hand: [],
          deck: [],
          inPlay: [],
          settlers: 10
        },

        player2: {
          hand: [],
          deck: [],
          inPlay: [],
          settlers: 10
        }
      },

      p1: p1Id,
      p2: p2Id,
      isFinished: false,
      isP1Turn: true
    }

    const {data: game} = await axios.post('/api/games/newGame', gameObj)
    await axios.put(`/api/users/${user._id}`, {
      email: user.email,
      userName: user.userName,
      imgUrl: user.imgUrl,
      collections: user.collections,
      games: [...user.games, game._id]
    })

    socket.emit('game started', {
      gameId: game._id,
      roomId: this.props.match.params.roomId
    })

    history.push(
      `/games/rooms/${this.props.match.params.roomId}/game/${game._id}`
    )
  }

  render() {
    return <h1>Waiting for players ...</h1>
  }
}
