import React from 'react'
import {ItemTypes} from '../dnd/types'
import {useDrop} from 'react-dnd'
import {addToCollection} from '../store/reducers/user'
import {connect} from 'react-redux'

function Collection(props) {
  const [{isOver, canDrop, item}, drop] = useDrop({
    accept: ItemTypes.DECK_CARD,
    drop: () => {
      //thunk!
      if (!props.collection.cards.includes(item.id)) {
        //thunk to add to collection.
        props.addToCollection(props.collection, item.id)
      } else {
        alert('card is already in the deck!')
      }
    },
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
      item: monitor.getItem()
    })
  })

  return props.collection._id ? (
    <div onClick={props.handleClick} ref={drop}>
      <div
        className={
          props.collection.isDeck ? 'collection' : 'collection allCards'
        }
      >{`${props.collection.name}`}</div>
      <span>
        {props.collection.cards.length}
        {props.collection.isDeck ? '/20' : ''}
      </span>
    </div>
  ) : (
    <h1>pick a deck</h1>
  )
}

const mapDispatchToProps = dispatch => ({
  addToCollection: (collection, cardId) =>
    dispatch(addToCollection(collection, cardId))
})
const mapStateToProps = (state, ownProps) => ({
  collection: state.user.collections.filter(
    coll => coll._id === ownProps.collection._id
  )[0]
})

export default connect(mapStateToProps, mapDispatchToProps)(Collection)
