import React, {Component} from 'react'
import axios from 'axios'
import history from '../history'
import {startGame, updateUserGames} from '../store/thunksAndActionCreators'
import {connect} from 'react-redux'
import io from 'socket.io-client'
export const socket = io('/games')

// export default class Room extends Component {
//   constructor(props) {
//     super(props)
//     this.startGame = this.startGame.bind(this)
//   }

//   async componentDidMount() {
//     const {data: user} = await axios.get('/auth/me')

//     socket.emit('join', {roomId: this.props.match.params.roomId})
//     socket.on('join', data => {
//       if (data.numPpl === 2) {
//         socket.emit('id exchange', {
//           oppId: user._id,
//           roomId: this.props.match.params.roomId
//         })
//       }
//     })

//     socket.on('id exchange', data => {
//       if (socket.id === data.host) this.startGame(user._id, data.oppId)
//     })

//     socket.on('game started', async data => {
//       await axios.put(`/api/users/${user._id}`, {
//         email: user.email,
//         userName: user.userName,
//         imgUrl: user.imgUrl,
//         collections: user.collections,
//         games: user.games.includes(data.gameId)
//           ? user.games
//           : [...user.games, data.gameId]
//       })
//       history.push(
//         `/games/rooms/${this.props.match.params.roomId}/game/${data.gameId}`
//       )
//     })
//   }

//   async startGame(p1Id, p2Id) {
//     const {data: user} = await axios.get('/auth/me')
//     const gameObj = {
//       game: {
//         player1: {
//           hand: [],
//           deck: [],
//           inPlay: [],
//           settlers: 10
//         },

//         player2: {
//           hand: [],
//           deck: [],
//           inPlay: [],
//           settlers: 10
//         }
//       },

//       p1: p1Id,
//       p2: p2Id,
//       isFinished: false,
//       isP1Turn: true
//     }

//     const {data: game} = await axios.post('/api/games/newGame', gameObj)
//     await axios.put(`/api/users/${user._id}`, {
//       email: user.email,
//       userName: user.userName,
//       imgUrl: user.imgUrl,
//       collections: user.collections,
//       games: user.games.includes(game._id)
//         ? user.games
//         : [...user.games, game._id]
//     })

//     socket.emit('game started', {
//       gameId: game._id,
//       roomId: this.props.match.params.roomId
//     })

//     history.push(
//       `/games/rooms/${this.props.match.params.roomId}/game/${game._id}`
//     )
//   }

//   render() {
//     return <h1>Waiting for players ...</h1>
//   }
// }

class Room extends Component {
  // constructor(props) {
  //   super(props)
  //   this.startGame = this.startGame.bind(this)
  // }

  componentDidMount() {
    // const {data: user} = await axios.get('/auth/me')

    const user = this.props.user
    const roomId = this.props.match.params.roomId

    socket.emit('join', {roomId: roomId})
    socket.on('join', data => {
      if (data.numPpl === 2) {
        socket.emit('id exchange', {
          oppId: user._id,
          roomId: roomId
        })
      }
    })

    socket.on('id exchange', async data => {
      if (socket.id === data.host) {
        // this.startGame(user._id, data.oppId)
        const gameId = await this.props.startGame(user._id, data.oppId)
        this.props.updateUserGames(user._id, {
          email: user.email,
          userName: user.userName,
          imgUrl: user.imgUrl,
          collections: user.collections,
          games: user.games.includes(gameId)
            ? user.games
            : [...user.games, gameId]
        })

        socket.emit('game started', {
          gameId: gameId,
          roomId: roomId
        })

        history.push(`/games/rooms/${roomId}/game/${gameId}`)
      }
    })

    socket.on('game started', data => {
      // await axios.put(`/api/users/${user._id}`, {
      //   email: user.email,
      //   userName: user.userName,
      //   imgUrl: user.imgUrl,
      //   collections: user.collections,
      //   games: user.games.includes(data.gameId)
      //     ? user.games
      //     : [...user.games, data.gameId]
      // })
      // history.push(
      //   `/games/rooms/${this.props.match.params.roomId}/game/${data.gameId}`
      // )

      this.props.updateUserGames(this.props.user._id, {
        email: user.email,
        userName: user.userName,
        imgUrl: user.imgUrl,
        collections: user.collections,
        games: user.games.includes(data.gameId)
          ? user.games
          : [...user.games, data.gameId]
      })

      history.push(`/games/rooms/${roomId}/game/${data.gameId}`)
    })
  }

  // async startGame(p1Id, p2Id) {
  //   const {data: user} = await axios.get('/auth/me')
  //   const gameObj = {
  //     game: {
  //       player1: {
  //         hand: [],
  //         deck: [],
  //         inPlay: [],
  //         settlers: 10
  //       },

  //       player2: {
  //         hand: [],
  //         deck: [],
  //         inPlay: [],
  //         settlers: 10
  //       }
  //     },

  //     p1: p1Id,
  //     p2: p2Id,
  //     isFinished: false,
  //     isP1Turn: true
  //   }

  //   const {data: game} = await axios.post('/api/games/newGame', gameObj)
  //   await axios.put(`/api/users/${user._id}`, {
  //     email: user.email,
  //     userName: user.userName,
  //     imgUrl: user.imgUrl,
  //     collections: user.collections,
  //     games: user.games.includes(game._id)
  //       ? user.games
  //       : [...user.games, game._id]
  //   })

  //   socket.emit('game started', {
  //     gameId: game._id,
  //     roomId: this.props.match.params.roomId
  //   })

  //   history.push(
  //     `/games/rooms/${this.props.match.params.roomId}/game/${game._id}`
  //   )
  // }

  render() {
    return (
      <h1>{`Your room is: ${this.props.match.params.roomId}\nSend this to your friend!`}</h1>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    startGame: (p1Id, p2Id) => dispatch(startGame(p1Id, p2Id)),
    updateUserGames: (userId, userData) =>
      dispatch(updateUserGames(userId, userData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Room)
