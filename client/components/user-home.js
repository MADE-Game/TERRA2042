import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Board from './Board'
import {me} from '../store/reducers/user'
import {Link} from 'react-router-dom'
import {logout} from '../store'

/**
 * COMPONENT
 */

export class UserHome extends React.Component {
  componentDidMount() {
    // this.props.me()
  }

  render() {
    let {email, userName, user} = this.props

    return (
      <div className="userHomeStyle imgContainer">
        <img
          src="https://i.pinimg.com/originals/e5/09/17/e5091761fa86b225581597e4e761d81e.jpg"
          className="userHomeBackground"
        />
        <div className="centered">
          <h1 className="welcomeStyle">Welcome, {userName}</h1>
          <div className="column">
            <div>
              <img src={user.imgUrl} className="userPic" />
            </div>
            <p className="vertSpace"></p>
            <div className="column">
              <div>
                <Link to="/games">
                  <button type="submit" className="buttonStyle3 bigger-button">
                    Play
                  </button>
                </Link>
              </div>
              <p className="vertSpace"></p>
              <div>
                <Link to="/shop">
                  <button type="submit" className="buttonStyle3 bigger-button">
                    Shop
                  </button>
                </Link>
              </div>
              <p className="vertSpace"></p>
              <div>
                <Link to="/collection">
                  <button type="submit" className="buttonStyle3 bigger-button">
                    My Collection
                  </button>
                </Link>
              </div>
              <p className="vertSpace"></p>
              <div>
                <a href="#" onClick={this.props.handleClick}>
                  <button type="submit" className="buttonStyle3 bigger-button">
                    Logout
                  </button>
                </a>
              </div>
              <p></p>
            </div>
          </div>
        </div>
        {/* board:
      <Board /> */}
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
