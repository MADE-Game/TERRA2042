import React, {Component} from 'react'
import axios from 'axios'
import history from '../history'
import io from 'socket.io-client'
export const socket = io('/games')
// import mainSocket from '../socket'
// mainSocket.disconnect()

export default class Room extends Component {
  constructor(props) {
    super(props)
    this.startGame = this.startGame.bind(this)
    // this.state = {
    //   loading: true
    // }
  }

  async componentDidMount() {
    const {data: user} = await axios.get('/auth/me')

    socket.emit('join', {roomId: this.props.match.params.roomId})
    socket.on('join', data => {
      if (data.numPpl === 2) {
        socket.emit('id exchange', {
          pId: user._id,
          roomId: this.props.match.params.roomId
        })
      }
    })
    socket.on('id exchange', data => {
      this.startGame(user._id, data.pId)
    })
    socket.on('game started', data => {
      history.push(
        `/games/rooms/${this.props.match.params.roomId}/game/${data.gameId}`
      )
    })

    // this.setState({
    //   loading: false
    // })
  }

  async startGame(p1Id, p2Id) {
    const {data: user} = await axios.get('/auth/me')
    const gameObj = {
      game: {
        player2: {
          hand: [],
          deck: [],
          inPlay: [],
          settlers: 10
        },

        player1: {
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
    // return this.state.loading ? (
    //   <img src="/images/monsters/1.png" />
    // ) : (
    //   <div>
    //     {/* <button type="button" onClick={this.startGame}>
    //       Start Game
    //     </button> */}
    //     <h1>Should not be seeing this</h1>
    //   </div>
    // )
    return <h1>Waiting for players ...</h1>
  }
}
