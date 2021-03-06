import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Login, Signup} from './components'
import Routes from './routes'
import {me} from './store'
import {Route, Switch} from 'react-router-dom'

class App extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }
  render() {
    return <Routes />
  }
}
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user._id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

export default connect(mapState, mapDispatch)(App)
