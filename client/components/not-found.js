import React from 'react'
import {MyButton as Button} from './Button'
import {Link} from 'react-router-dom'
const NotFound = () => (
  <div className="notFound-wrapper">
    <div className="notFound-messageContainer">
      <h3 className="notFound-text">404 Page Not Found</h3>
      <h4 className="notFound-text">
        Sorry we can't find the page you are looking for
      </h4>
      <Link to="/home">
        <Button text="Home" color="default" icon="home" />
      </Link>
    </div>
  </div>
)

export default NotFound
