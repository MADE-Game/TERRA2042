import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {me} from '../store/reducers/user'
import {Link} from 'react-router-dom'
import {logout} from '../store'

/**
 * COMPONENT
 */

export class UserHome extends Component {
  componentDidMount() {
    // this.props.me()
  }

  render() {
    let {email, userName, user} = this.props

    return (
      <div id="userHomeStyle">
        <div className="column">
          <p id="welcomeStyle">Welcome, {userName}</p>
          <div>
            <Link to="/games">
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
  // return (
  //   <div
  //     id="homepage"
  //     style={{
  //       display: 'flex',
  //       flexDirection: 'column',
  //       justifyContent: 'center',
  //       alignItems: 'center',
  //       minHeight: '100vh'
  //     }}
  //   >
  //     <Link to="/games">Play</Link>
  //     <Link to="/">Shop</Link>
  //     <Link to="/decks">Collection</Link>
  //     <Link to="/">Logout</Link>
  //   </div>
  // )
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
