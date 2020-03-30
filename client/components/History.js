import React from 'react'
import {getGames} from '../store/reducers/user'
import {connect} from 'react-redux'

class History extends React.Component {
  componentDidMount() {
    this.props.getGames()
  }
  render() {
    return (
      <table>
        <tbody>
          <tr>
            <td>W/L</td>
            <td>Opponent</td>
            <td>Your Settlers</td>
            <td>Opponent's settlers</td>
          </tr>
          {this.props.games.map(game => {
            const amP1 = game.p1 === this.props.userName
            const result =
              (amP1 &&
                game.game.player1.settlers > game.game.player2.settlers) ||
              (!amP1 && game.game.player1.settlers < game.game.player2.settlers)
                ? 'W'
                : 'L'
            return (
              <tr key={game._id}>
                <td>{result}</td>
                <td>{amP1 ? game.p2 : game.p1}</td>
                <td>
                  {amP1
                    ? game.game.player1.settlers
                    : game.game.player2.settlers}
                </td>
                <td>
                  {amP1
                    ? game.game.player2.settlers
                    : game.game.player1.settlers}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
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
