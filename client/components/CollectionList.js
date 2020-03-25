import {
  getAllUserCollections,
  getCollectionCards
} from '../store/reducers/user.js'
import Collection from './Collection'
import DisplayCard from './DisplayCard'
import {connect} from 'react-redux'
import React, {Component} from 'react'

class CollectionList extends Component {
  componentDidMount() {
    this.props.loadInitialData()
    this.props.loadCards()
    // console.log(this.props)
  }

  render() {
    if (this.props.selectedCollection.cards) {
      return (
        <div>
          <div id="collections">
            {this.props.userCollections.map(collection => {
              return <Collection key={collection._id} collection={collection} />
            })}
          </div>
          <div id="selectedCollection">
            {this.props.selectedCollection.cards.map(card => {
              return <DisplayCard key={card._id} card={card} />
            })}
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <div id="collections">
            {this.props.userCollections.map(collection => {
              return <Collection key={collection._id} collection={collection} />
            })}
          </div>
          <div id="selectedCollection">No selection</div>
        </div>
      )
    }
  }
}
const mapState = state => {
  // console.log(state)
  return {
    userCollections: state.user.collections,

    selectedCollection: state.user.selectedCollection
  }
}

const mapDispatch = dispatch => {
  return {
    loadCards: () => {
      dispatch(getCollectionCards())
    },
    loadInitialData: () => {
      //at some point this will have to refer to an actual user
      dispatch(getAllUserCollections())
    }
  }
}

export default connect(mapState, mapDispatch)(CollectionList)
