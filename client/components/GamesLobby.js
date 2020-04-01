import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {selectDeck, selectClass} from '../store/reducers/user'
import Dropdown from './Dropdown'
import Textfield from './Textfield'
import {MyButton as Button} from './Button'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const classesArray = [
  'Select Class',
  'Forager',
  'Medic',
  'Metalhead',
  'Cultist',
  'Bandit',
  'Hoarder'
]
class GamesLobby extends Component {
  constructor() {
    super()
    this.state = {
      roomId: '',
      name: '',
      // eslint-disable-next-line react/no-unused-state
      classSelected: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.noClassAlert = this.noClassAlert.bind(this)
  }

  handleChange(event) {
    this.setState({
      roomId: event.target.value
    })
  }

  handleSubmit() {
    this.props.history.push(`/games/rooms/${this.state.roomId}`)
  }

  noClassAlert() {
    toast.warning('You must select your class before entering a game', {
      position: toast.POSITION.TOP_CENTER
    })
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
          {this.state.classSelected === true &&
          this.props.user.selectedClass !== 'Select Class' ? (
            <Link to={`/games/rooms/${Math.floor(Math.random() * 1000000)}`}>
              <Button text="Create Game" color="default" />
            </Link>
          ) : (
            <Button
              text="Create Game"
              color="default"
              onClick={this.noClassAlert}
            />
          )}

          <div onChange={this.handleChange} value={this.state.roomId}>
            <Textfield name="room number" />
          </div>
          <Dropdown
            selectDeck={this.props.selectDeck}
            name={this.state.name}
            decks={this.props.decks}
          />
          <label htmlFor="class">Pick Your Class</label>
          <select
            name="class"
            onChange={e => {
              this.setState({
                name: e.target.value,
                // eslint-disable-next-line react/no-unused-state
                classSelected: true
              })
              this.props.selectClass(this.props.user._id, e.target.value)
              localStorage.setItem('theClass', e.target.value)
            }}
            value={this.state.class}
          >
            {classesArray.map(Class => {
              return (
                <option value={Class} key={Class}>
                  {Class}
                </option>
              )
            })}
          </select>
          <div onClick={this.handleSubmit}>
            <Button text="Join Game" color="secondary" />
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    decks: state.user.collections
      .filter(coll => coll.cards.length === 20 && coll.isDeck)
      .map(coll => coll.name),
    user: state.user
  }
}
const mapDispatch = dispatch => ({
  selectDeck: deckName => dispatch(selectDeck(deckName)),
  selectClass: (id, Class) => dispatch(selectClass(id, Class))
})
export default connect(mapState, mapDispatch)(GamesLobby)
