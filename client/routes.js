import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup, UserHome} from './components'
import GamesLobby from './components/GamesLobby'
import History from './components/History'
import Collection from './components/Collection'
import Shop from './components/Shop'
import Board from './components/Board'
import NotFound from './components/not-found'
import {me} from './store'
import CollectionList from './components/CollectionList'
import Room from './components/Room'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

/**
 * COMPONENT
 */

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
    if (!document.getElementById('theme')) {
      try {
        const theme = document.createElement('audio')
        theme.id = 'theme'
        theme.src = '/theme.mp3'
        theme.loop = true
        theme.volume = this.state.vol
        document.getElementById('app').appendChild(theme)
        window.addEventListener('keydown', event => {
          if (event.key === 'ArrowDown')
            theme.paused ? theme.play() : theme.pause()
        })

        if (theme.paused)
          toast.info('Press down-arrow key to pause/play the soundtrack', {
            position: toast.POSITION.TOP_CENTER
          })
      } catch (error) {
        return false
      }
    }
  }

  render() {
    const {isLoggedIn} = this.props
    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        {isLoggedIn ? (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route exact path="/lobby" component={GamesLobby} />
            <Route
              exact
              path="/games/rooms/:roomId"
              render={({match}) => <Room match={match} />}
            />
            <Route path="/games/rooms/:roomId/game/:id" component={Board} />
            <Route path="/decks" component={CollectionList} />
            <Route path="/home" component={UserHome} />
            <Route exact path="/" component={UserHome} />
            <Route path="/shop" component={Shop} />
            <Route path="/collection" component={Collection} />
            <Route path="/history" component={History} />
            <Route path="/devBoard" component={Board} />
            <Route component={NotFound} />
          </Switch>
        ) : (
          <Switch>
            <Route path="/" component={Login} />
            <Route component={NotFound} />
          </Switch>
        )}
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user._id,
    playerName: state.user.userName
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
