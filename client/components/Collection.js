import React from 'react'

export default function Collection(props) {
  // console.log(props)
  return props.collection._id ? (
    <div onClick={props.handleClick}>
      <div className="collection">{`${props.collection.name}`}</div>
      <span>{props.collection.cards.length}/20</span>
    </div>
  ) : (
    <h1>pick a deck</h1>
  )
}
