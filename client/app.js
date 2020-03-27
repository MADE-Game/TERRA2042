import React from 'react'
import {connect} from 'react-redux'
import {Login, Signup} from './components'
import Routes from './routes'
import {me} from './store'
import {Route, Switch} from 'react-router-dom'

class App extends React.Component {
  componentDidMount() {
    this.props.loadInitialData()
  }
  render() {
    return (
      <div id="routes-wrapper">
        {this.props.isLoggedIn ? (
          <div id="routes">
            <Routes />
          </div>
        ) : (
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route exact path="/" component={Login} />
          </Switch>
        )}
      </div>
    )
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
