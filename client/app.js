import React from 'react'
import {connect} from 'react-redux'
import {Navbar, Login} from './components'
import Routes from './routes'
import Chat from './components/Chat'
import {me} from './store'

class App extends React.Component {
  componentDidMount() {
    this.props.loadInitialData()
  }
  render() {
    return (
      <div>
        {this.props.isLoggedIn ? (
          <div>
            <Navbar />
            <Routes />
            {/* <Chat /> */}
          </div>
        ) : (
          <Login />
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
