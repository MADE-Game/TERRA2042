import React, {Component} from 'react'
import axios from 'axios'
import history from '../history'

export default class Room extends Component {
  constructor() {
    super()
    this.startGame = this.startGame.bind(this)
  }

  async startGame() {
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

      p1: `${user._id}`,
      p2: 'player 2 id',
      isFinished: false,
      isP1Turn: true
    }

    const {data: game} = await axios.post('/api/games/newGame', gameObj)
    user.games.push(game._id) //  <=== doesnt work
    history.push(`/games/rooms/game/${game._id}`)
  }

  render() {
    return (
      <div>
        <button type="button" onClick={this.startGame}>
          Start Game
        </button>
      </div>
    )
  }
}
