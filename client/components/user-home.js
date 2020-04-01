import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {me} from '../store/reducers/user'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {MyButton as Button} from './Button'

/**
 * COMPONENT
 */

export class UserHome extends Component {
  componentDidMount() {
    if (!document.getElementById('theme')) {
      try {
        const theme = document.createElement('audio')
        theme.id = 'theme'
        theme.src = '/theme.mp3'
        theme.loop = true
        theme.volume = 0.1
        document.getElementById('app').appendChild(theme)
        theme.play()

        window.addEventListener('keydown', event => {
          if (event.key === 'ArrowDown' && theme.paused) theme.play()
          else if (event.key === 'ArrowDown' && !theme.paused) theme.pause()
        })

        if (!theme.paused)
          toast.info('Press down-arrow key to pause/play the soundtrack', {
            position: toast.POSITION.TOP_CENTER
          })
      } catch (error) {
        return false
      }
    }
  }

  render() {
    let {email, userName, user} = this.props

    return (
      <div id="userHomeStyle">
        <div className="column">
          <p id="welcomeStyle">Welcome, {userName}</p>
          <div>
            <Link
              to={
                localStorage.gameId &&
                localStorage.playerId === this.props.user._id
                  ? `/games/rooms/${localStorage.roomId}/game/${localStorage.gameId}`
                  : '/lobby'
              }
            >
              <Button text="Play" color="default" icon="game" />
            </Link>
          </div>
          <div>
            <Link to="/shop">
              <Button text="Shop" color="default" icon="shop" />
            </Link>
          </div>
          <div>
            <Link to="/decks">
              <Button text="My Collection" color="default" icon="deck" />
            </Link>
          </div>
          <div>
            <div>
              <Link to="/history">
                <Button text="Stats" color="default" icon="stats" />
              </Link>
            </div>
            <a href="#" onClick={this.props.handleClick}>
              <Button text="Logout" color="default" icon="logout" />
            </a>
          </div>
          <p></p>
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapStateToProps = state => {
  return {
    email: state.user.email,
    userName: state.user.userName,
    user: state.user
  }
}
const mapDispatchToProps = dispatch => {
  return {
    me: () => dispatch(me()),
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
