import {
  getAllUserCollections,
  getCollection,
  createDeck,
  removeFromCollection
} from '../store/reducers/user.js'
import Collection from './Collection'
import DisplayCard from './DisplayCard'
import {connect} from 'react-redux'
import React, {Component} from 'react'
import Backend from 'react-dnd-html5-backend'
import {DndProvider} from 'react-dnd'
import {Link} from 'react-router-dom'

class CollectionList extends Component {
  constructor() {
    super()
    this.state = {
      name: ''
    }

    this.handleClick = this.handleClick.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
  }

  componentDidMount() {
    this.props.loadInitialData(this.props.user._id)
    // this.props.loadCards(this.props.selectedCollection._id)
  }

  handleClick(collectionId) {
    this.props.loadCards(collectionId)
    // this.props.loadInitialData(this.props.user._id)
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.createDeck(this.state.name)
    this.setState({
      name: ''
    })
  }

  handleChange(event) {
    this.setState({
      name: event.target.value
    })
  }
  handleRemove(coll, cardId) {
    this.props.removeFromCollection(coll, cardId)
  }

  render() {
    return (
      <DndProvider backend={Backend}>
        <div>
          <Link to="/home">
            <button type="button" className="buttonStyle1">
              Home
            </button>
          </Link>
          <div id="collections">
            {this.props.userCollections.map(collection => {
              return (
                <Collection
                  handleClick={() => {
                    this.handleClick(collection._id)
                  }}
                  key={collection._id}
                  collection={collection}
                />
              )
            })}
          </div>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="deck">Deck Name</label>
            <input
              name="deck"
              value={this.state.name}
              onChange={this.handleChange}
            ></input>
            <button type="submit">Create Deck</button>
          </form>

          <div id="selectedCollection">
            <hr />
            <h1>{this.props.selectedCollection.name}</h1>
            {this.props.selectedCollection.cards.map(card => {
              return (
                <DisplayCard
                  key={card._id}
                  card={card}
                  isDeck={this.props.selectedCollection.isDeck}
                  handleRemove={e =>
                    this.handleRemove(this.props.selectedCollection, card._id)
                  }
                />
              )
            })}
          </div>
        </div>
      </DndProvider>
    )
  }
}

const mapState = state => {
  return {
    userCollections: state.user.collections,
    selectedCollection: state.user.selectedCollection,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    loadCards: collectionId => {
      dispatch(getCollection(collectionId))
    },
    loadInitialData: userId => {
      //at some point this will have to refer to an actual user
      dispatch(getAllUserCollections(userId))
    },
    createDeck: deckName => {
      dispatch(createDeck(deckName))
    },
    removeFromCollection: (collection, cardId) =>
      dispatch(removeFromCollection(collection, cardId))
  }
}

export default connect(mapState, mapDispatch)(CollectionList)
