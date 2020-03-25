import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div className="formContainer">
      <div className="imgContainer">
        <img
          className="logoImg"
          src="https://i.pinimg.com/originals/08/de/6e/08de6e25d051968bbd82c9ee8a7e0ffc.jpg"
        />
        <div className="centered madeStyle">MADE</div>

        <form onSubmit={handleSubmit} name={name} className="formColumn">
          {displayName === 'Sign Up' && (
            <div>
              <label htmlFor="email">
                <small className="inputTextStyle">Email</small>
              </label>
              <input name="email" type="text" className="inputStyle1" />
            </div>
          )}
          <div>
            <label htmlFor="username">
              <small className="inputTextStyle">Username</small>
            </label>
            <input name="username" type="text" className="inputStyle1" />
          </div>
          <div>
            <label htmlFor="password">
              <small className="inputTextStyle">Password</small>
            </label>
            <input name="password" type="password" className="inputStyle1" />
          </div>

          <div className="loginButtons">
            <button type="submit" className="buttonStyle1">
              {displayName}
            </button>
            {displayName === 'Login' && (
              <Link to="/signup">
                <div>
                  <button type="submit" className="buttonStyle1">
                    Sign Up
                  </button>
                </div>
              </Link>
            )}
          </div>

          {error && error.response && <div> {error.response.data} </div>}
          <a href="/auth/google" className="inputTextStyle">
            {displayName} with Google
          </a>
        </form>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      const username = evt.target.username.value
      dispatch(auth(email, password, formName, username))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
