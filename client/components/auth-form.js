import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import {Link} from 'react-router-dom'
import {MyButton as Button} from './Button'
import TextField from '@material-ui/core/TextField'
import {display} from '@material-ui/system'

/**
 * COMPONENT
 */
// function emailIsValid (email) {
//     return /\S+@\S+\.\S+/.test(email)
// }
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div className="formContainer">
      <p id="title">
        <i>TERRA 2042</i>
      </p>
      <form onSubmit={handleSubmit} name={name} className="formColumn">
        {displayName === 'Sign Up' && (
          <div className="heroInput">
            <input
              name="email"
              type="Email"
              placeholder="Email"
              className="inputStyle"
              required
            />
          </div>
        )}
        <div className="heroInput">
          <input
            name="username"
            type="text"
            placeholder="Username"
            className="inputStyle"
            minLength="2"
            maxLength="20"
            required
          />
        </div>
        <div className="heroInput">
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="inputStyle"
            minLength="4"
            maxLength="20"
            required
          />
        </div>

        <div className="loginButtons">
          <Button text={displayName} color="default" icon={displayName} />
          {displayName === 'Login' ? (
            <Link to="/signup">
              <Button text="Sign Up" color="default" icon="Sign Up" />
            </Link>
          ) : (
            <Link to="/login">
              <Button text="Login" color="default" icon="Login" />
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
      // const validateFunc()
      const formName = evt.target.name

      let email = ''
      if (evt.target.email) {
        email = evt.target.email.value
      }
      console.log(evt.target)
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
