import {
  getAllUserCollections,
  getCollection,
  createDeck,
  removeFromCollection,
  removeCollection
} from '../store/reducers/user.js'
import Collection from './Collection'
import DisplayCard from './DisplayCard'
import {connect} from 'react-redux'
import React, {Component} from 'react'
import Backend from 'react-dnd-html5-backend'
import {DndProvider} from 'react-dnd'
import {Link} from 'react-router-dom'
import {toast} from 'react-toastify'
import Button from '@material-ui/core/Button'
import {MyButton as Button2} from './Button'
import 'react-toastify/dist/ReactToastify.css'
import {zoomOut, fadeOut, fadeInUp} from 'react-animations'
import styled, {keyframes} from 'styled-components'
import {MyIconButton as IconButton} from './IconButton'

const Zoom = styled.div`
  animation: 1s ${keyframes`${zoomOut}`};
`

const Fade = styled.div`
  animation: 1s ${keyframes`${fadeOut}`};
`

const FadeInUp = styled.div`
  animation: 1s ${keyframes`${fadeInUp}`};
`

class CollectionList extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      recentlyDeletedCard: '',
      recentlyDeletedColl: ''
    }

    this.handleClick = this.handleClick.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.handleChangeState = this.handleChangeState.bind(this)
  }

  componentDidMount() {
    this.props.loadCards(this.props.userCollections[0]._id)
  }

  handleClick(collectionId) {
    this.props.loadCards(collectionId)
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
    this.setState({
      recentlyDeletedCard: cardId
    })
  }

  handleChangeState(collId) {
    this.setState({
      recentlyDeletedColl: collId
    })
  }

  render() {
    return (
      <DndProvider backend={Backend}>
        <div
          style={{
            minWidth: '100vw',
            minHeight: ' 100vh',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <div
            style={{
              display: 'flex',
              backgroundImage: `url('./images/decknav.png')`,
              boxShadow: '0px 5px 5px',
              alignItems: 'center',
              justifyContent: 'flex-start',
              paddingTop: '6vh',
              paddingBottom: '10.5vh',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              marginTop: '-10.5em'
            }}
          >
            <div
              style={{
                display: 'flex',
                paddingLeft: '3vh',
                paddingRight: '3vh',
                marginTop: '7em'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginRight: '1vh',
                  justifyContent: 'center'
                }}
              >
                <Link to="/home">
                  <Button2 text="Home" color="default" icon="home" />
                </Link>
                <form onSubmit={this.handleSubmit} id="deckform">
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
                  <Button variant="contained" type="submit">
                    Create Deck
                  </Button>
                </form>
                <h3
                  style={{
                    textAlign: 'center',
                    margin: '0',
                    marginTop: '3%',
                    fontSize: '12px',
                    color: '#fff',
                    letterSpacing: '3px'
                  }}
                >
                  {this.props.selectedCollection.name.toUpperCase()}
                </h3>
              </div>
              <div id="collections">
                {this.props.userCollections.map(collection => {
                  return this.state.recentlyDeletedColl !==
                    collection._id.toString() ? (
                    <div key={collection._id}>
                      <Collection
                        handleClick={() => {
                          this.handleClick(collection._id)
                        }}
                        collection={collection}
                      />
                      <span className="deckCount">
                        {collection.cards.length}
                        {collection.isDeck ? '/20' : ''}
                        {!['Default Deck', 'My Cards'].includes(
                          collection.name
                        ) ? (
                          <IconButton
                            handleChangeState={this.handleChangeState}
                            text="deleteDeck"
                            collection={collection}
                            removeCollection={this.props.removeCollection}
                          />
                        ) : (
                          ''
                        )}
                      </span>
                    </div>
                  ) : (
                    <div key={collection._id}>
                      <Fade>
                        <Collection collection={collection} />

                        <span className="deckCount">
                          {collection.cards.length}
                          {collection.isDeck ? '/20' : ''}
                          {!['Default Deck', 'My Cards'].includes(
                            collection.name
                          ) ? (
                            <IconButton
                              handleChangeState={this.handleChangeState}
                              text="deleteDeck"
                              collection={collection}
                              removeCollection={removeCollection}
                            />
                          ) : (
                            ''
                          )}
                        </span>
                      </Fade>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          <div id="selectedCollection">
            {this.props.selectedCollection.cards.map(card => {
              return this.state.recentlyDeletedCard !== card._id ? (
                <FadeInUp key={card._id}>
                  <DisplayCard
                    key={card._id}
                    card={card}
                    isDeck={this.props.selectedCollection.isDeck}
                    handleRemove={() =>
                      this.handleRemove(this.props.selectedCollection, card._id)
                    }
                  />
                </FadeInUp>
              ) : (
                <Zoom key={card._id}>
                  <DisplayCard
                    key={card._id}
                    card={card}
                    isDeck={this.props.selectedCollection.isDeck}
                  />
                </Zoom>
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
      dispatch(getAllUserCollections(userId))
    },
    createDeck: deckName => {
      dispatch(createDeck(deckName))
    },
    removeFromCollection: (collection, cardId) =>
      dispatch(removeFromCollection(collection, cardId)),

    removeCollection: collId => dispatch(removeCollection(collId))
  }
}

export default connect(mapState, mapDispatch)(CollectionList)
