/* eslint-disable no-alert */
import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {selectDeck} from '../store/reducers/user'

class GamesLobby extends Component {
  constructor() {
    super()
    this.state = {
      roomId: '',
      name: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      roomId: event.target.value
    })
  }
  handleSubmit(e) {
    this.props.history.push(`/games/rooms/${this.state.roomId}`)
  }
  render() {
    console.log('props in render', this.props)
    return (
      <div>
        <h1>Welcome to the lobby!</h1>
        <Link to={`/games/rooms/${Math.floor(Math.random() * 1000000)}`}>
          <button type="button">Create Game Room</button>
        </Link>
        <hr />
        <form onSubmit={this.handleSubmit}>
          <input
            name="room"
            value={this.state.roomId}
            onChange={this.handleChange}
            onSubmit={this.handleSubmit}
          />
        </form>
        <Link to={`/games/rooms/${this.state.roomId}`}>
          <button type="button">Join Game Room</button>
        </Link>
        <p>
          I think this is a good place to be able to pick your deck and class!
        </p>
        <label htmlFor="deck">Pick your deck</label>
        <select
          name="deck"
          onChange={e => {
            this.setState({
              name: e.target.value
            })
            this.props.selectDeck(e.target.value)
          }}
          value={this.state.name}
        >
          {this.props.decks.map(deck => (
            <option value={deck} key={deck}>
              {deck}
            </option>
          ))}
        </select>
      </div>
    )
  }
}
const mapState = state => {
  return {
    decks: state.user.collections
      .filter(coll => coll.cards.length === 20 && coll.isDeck)
      .map(coll => coll.name)
  }
}
const mapDispatch = dispatch => ({
  selectDeck: deckName => dispatch(selectDeck(deckName))
})
export default connect(mapState, mapDispatch)(GamesLobby)
