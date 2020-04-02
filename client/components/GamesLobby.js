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

  handleSubmit(e) {
    e.preventDefault()
    if (this.state.roomId !== '') {
      return this.props.history.push(`/games/rooms/${this.state.roomId}`)
    }
    toast.warning('That is not a valid room name!', {
      position: toast.POSITION.TOP_CENTER
    })
  }

  noClassAlert(e) {
    e.preventDefault()
    toast.warning('You must select your class before entering a game', {
      position: toast.POSITION.TOP_CENTER
    })
  }

  render() {
    delete localStorage.log

    return (
      <div id="lobby">
        <div id="lobbyBox">
          <p>Welcome to the lobby!</p>
          <Link to="/home">
            <Button text="Home" color="default" icon="home" />
          </Link>
          <Dropdown
            selectDeck={this.props.selectDeck}
            name={this.state.name}
            decks={this.props.decks}
          />
          <select
            name="class"
            onChange={e => {
              this.setState({
                name: e.target.value,
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

          {/* <Button text="Join Game" color="secondary" /> */}
          <div
            onChange={this.handleChange}
            value={this.state.roomId}
            onSubmit={
              this.state.classSelected === true &&
              this.props.user.selectedClass !== 'Select Class'
                ? this.handleSubmit
                : this.noClassAlert
            }
          >
            <Textfield name="room number" className="textfield" />
          </div>
          {this.state.classSelected === true &&
          this.props.user.selectedClass !== 'Select Class' ? (
            <div onClick={this.handleSubmit}>
              <Button text="Join Game" color="secondary" />
            </div>
          ) : (
            <div onClick={this.noClassAlert}>
              <Button text="Join Game" color="secondary" />
            </div>
          )}
          {this.state.classSelected === true &&
          this.props.user.selectedClass !== 'Select Class' ? (
            <Link to={`/games/rooms/${Math.floor(Math.random() * 1000000)}`}>
              <Button text="Create Game" color="default" />
            </Link>
          ) : (
            <div onClick={this.noClassAlert}>
              <Button text="Create Game" color="default" />
            </div>
          )}
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
