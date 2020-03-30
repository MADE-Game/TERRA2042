import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {me} from '../store/reducers/user'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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
            <Link to="/lobby">
              <button type="submit" className="buttonStyle2">
                Play
              </button>
            </Link>
          </div>
          <div>
            <Link to="/shop">
              <button type="submit" className="buttonStyle2">
                Shop
              </button>
            </Link>
          </div>
          <div>
            <Link to="/decks">
              <button type="submit" className="buttonStyle2">
                My Collection
              </button>
            </Link>
          </div>
          <div>
            <a href="#" onClick={this.props.handleClick}>
              <button type="submit" className="buttonStyle2">
                Logout
              </button>
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
