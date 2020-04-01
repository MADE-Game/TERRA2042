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
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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
    this.props.loadCards(this.props.userCollections[0]._id)
    // let allCardsDiv = document.getElementsByClassName('buttonContainer')
    // this.props.loadCards(this.props.selectedCollection._id)
  }

  handleClick(collectionId) {
    this.props.loadCards(collectionId)
    // this.props.loadInitialData(this.props.user._id)
  }

  handleSubmit(event) {
    event.preventDefault()

    if (/\S/.test(this.state.name)) this.props.createDeck(this.state.name)
    else
      toast.error('Deck name cannot be empty!', {
        position: toast.POSITION.TOP_CENTER
      })

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
          <div
            style={{
              display: 'flex',
              backgroundColor: '#b1645e',
              padding: '1em',
              boxShadow:
                'inset 0px 1px 0px #5f1d18, 0px 10px 0px 0px #5f1d18, 0px 0px 0px'
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}
            >
              <Link to="/home">
                <button type="button" className="buttonStyle5">
                  Home
                </button>
              </Link>
              <form
                onSubmit={this.handleSubmit}
                style={{display: 'flex', flexDirection: 'column'}}
              >
                <input
                  required
                  name="deck"
                  className="inputStyle1"
                  placeholder="Deck Name"
                  value={this.state.name}
                  onChange={this.handleChange}
                  onKeyDown={event => {
                    if (event.key === ' ') {
                      toast.warning('No spaces allowed', {
                        position: toast.POSITION.TOP_CENTER
                      })
                      event.preventDefault()
                      return false
                    }
                  }}
                ></input>
                <button type="submit" className="buttonStyle5">
                  Create Deck
                </button>
              </form>
              <h3 style={{textAlign: 'center', margin: '0'}}>
                {this.props.selectedCollection.name}
              </h3>
            </div>
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
          </div>
          <div id="selectedCollection">
            {this.props.selectedCollection.cards.map(card => {
              return (
                <DisplayCard
                  key={card._id}
                  card={card}
                  isDeck={this.props.selectedCollection.isDeck}
                  handleRemove={() =>
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
