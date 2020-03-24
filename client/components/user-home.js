import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Board from './Board'

/**
 * COMPONENT
 */

export const UserHome = props => {
  const {email, userName} = props

  return (
    <div>
      <h3>Welcome, {userName}</h3>
      board:
      <Board />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    userName: state.user.userName
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
