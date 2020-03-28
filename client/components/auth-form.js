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
      <form onSubmit={handleSubmit} name={name} className="formColumn">
        {displayName === 'Sign Up' && (
          <div className="heroInput">
            <label htmlFor="email" placeholder="Email" />
            <input
              placeholder="email"
              name="email"
              type="text"
              className="inputStyle"
            />
          </div>
        )}
        <div className="heroInput">
          <label htmlFor="username" />
          <input
            placeholder="username"
            name="username"
            type="text"
            className="inputStyle"
          />
        </div>
        <div className="heroInput">
          <label htmlFor="password" placeholder="Password" />
          <input
            placeholder="password"
            name="password"
            type="password"
            className="inputStyle"
          />
        </div>

        <div className="loginButtons">
          <button type="submit" className="buttonStyle1">
            {displayName}
          </button>
          {displayName === 'Login' ? (
            <Link to="/signup">
              <button type="submit" className="buttonStyle1">
                Sign Up
              </button>
            </Link>
          ) : (
            <Link to="/login">
              <button type="submit" className="buttonStyle1">
                Login
              </button>
            </Link>
          )}
        </div>

        {error && error.response && <div> {error.response.data} </div>}
        <a href="/auth/google" id="googleLogin">
          {displayName} with Google
        </a>
      </form>
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

      let email = ''
      if (evt.target.email) {
        email = evt.target.email.value
      }
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
