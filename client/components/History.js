/* eslint-disable complexity */
import React from 'react'
import {getGames} from '../store/reducers/user'
import {connect} from 'react-redux'

const mapGames = (games, username) => {
  return games.map(game => {
    const amP1 = game.p1 === username
    const result =
      (amP1 && game.game.player1.settlers > game.game.player2.settlers) ||
      (!amP1 && game.game.player1.settlers < game.game.player2.settlers)
        ? 'W'
        : 'L'
    return [
      <tr key={game._id}>
        <td>{result}</td>
        <td>{amP1 ? game.p2 : game.p1}</td>
        <td>
          {amP1 ? game.game.player1.settlers : game.game.player2.settlers}
        </td>
        <td>
          {amP1 ? game.game.player2.settlers : game.game.player1.settlers}
        </td>
      </tr>,
      result
    ]
  })
}

class History extends React.Component {
  componentDidMount() {
    this.props.getGames()
  }
  render() {
    const games = mapGames(this.props.games, this.props.userName)
    const totalWins = games.reduce((acc, curr) => {
      return acc + (curr[1] === 'W') ? 1 : 0
    }, 0)
    return (
      <div className="history">
        <h1>total wins: {totalWins}</h1>
        {this.props.games.length === 0 ? (
          <h1>Play your first game to see your stats!</h1>
        ) : (
          <table>
            <tbody>
              <tr>
                <td>W/L</td>
                <td>Opponent</td>
                <td>Your Settlers</td>
                <td>Opponent's settlers</td>
              </tr>
              {games.map(game => game[0])}
            </tbody>
          </table>
        )}
      </div>
    )
  }
}

const mapState = state => ({
  games: state.user.history,
  userName: state.user.userName
})
const mapDispatch = dispatch => ({
  getGames: () => dispatch(getGames())
})
export default connect(mapState, mapDispatch)(History)
