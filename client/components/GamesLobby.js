import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {selectDeck} from '../store/reducers/user'
import Dropdown from './Dropdown'
import Textfield from './Textfield'
import {MyButton as Button} from './Button'

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
  handleSubmit() {
    this.props.history.push(`/games/rooms/${this.state.roomId}`)
  }
  render() {
    delete localStorage.log
    return (
      <div id="lobby">
        <div id="lobbyBox">
          <p>LOBBY</p>
          <Link to="/home">
            <Button text="Home" color="default" icon="home" />
          </Link>
          <Link to={`/games/rooms/${Math.floor(Math.random() * 1000000)}`}>
            <Button text="Create Game" color="default" />
          </Link>
          <Textfield name="room number" />
          <Dropdown
            selectDeck={this.props.selectDeck}
            name={this.state.name}
            decks={this.props.decks}
          />
          <Link to={`/games/rooms/${this.state.roomId}`} style={{}}>
            <Button text="Join Game" color="secondary" />
          </Link>
        </div>
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
