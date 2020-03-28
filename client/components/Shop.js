import React from 'react'
import {Link} from 'react-router-dom'

export const Shop = () => {
  return (
    <div>
      <Link to="/home">
        <button type="button" className="buttonStyle1">
          Home
        </button>
      </Link>
    </div>
  )
}
