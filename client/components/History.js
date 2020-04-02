/* eslint-disable complexity */
import React from 'react'
import {getGames} from '../store/reducers/user'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from '@material-ui/core'
import Paper from '@material-ui/core/Paper'

const mapGames = (games, username) => {
  return games.map(game => {
    const amP1 = game.p1 === username
    const result =
      (amP1 && game.game.player1.settlers > game.game.player2.settlers) ||
      (!amP1 && game.game.player1.settlers < game.game.player2.settlers)
        ? 'W'
        : 'L'
    return [
      <TableRow key={game._id} hover>
        <TableCell align="center">{result}</TableCell>
        <TableCell align="center">{amP1 ? game.p2 : game.p1}</TableCell>
        <TableCell align="center">
          {amP1 ? game.game.player1.settlers : game.game.player2.settlers}
        </TableCell>
        <TableCell align="center">
          {amP1 ? game.game.player2.settlers : game.game.player1.settlers}
        </TableCell>
      </TableRow>,
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
      acc += curr[1] === 'W' ? 1 : 0
      return acc
    }, 0)
    return (
      <div className="history">
        <Link to="/home">
          <button type="button" className="buttonStyle1">
            Home
          </button>
        </Link>
        <h1 className="history-text">total wins: {totalWins}</h1>
        {this.props.games.length === 0 ? (
          <h1 className="history-text">
            Play your first game to see your stats!
          </h1>
        ) : (
          <TableContainer component={Paper}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell align="center">W/L</TableCell>
                  <TableCell align="center">Opponent</TableCell>
                  <TableCell align="center">Your Settlers</TableCell>
                  <TableCell align="center">Opponent's Settlers</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{games.map(game => game[0])}</TableBody>
            </Table>
          </TableContainer>
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
