import React, {Component} from 'react'
import {ShopCard} from './ShopCard'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {addToUserCards, getCardsInShop} from '../store/reducers/user'

class Shop extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.props.getCardsInShop()
  }

  handleClick(cardId) {
    this.props.addToUserCards([...this.props.userCards, cardId])
  }

  render() {
    return (
      <div id="shop">
        <Link to="/home">
          <button type="button" className="buttonStyle1">
            Home
          </button>
        </Link>
        <div id="shop-cards">
          {this.props.inShop.map(card => {
            return (
              <ShopCard
                key={card._id}
                card={card}
                handleClick={this.handleClick}
              />
            )
          })}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    userCards: state.user.collections
      .filter(coll => !coll.isDeck)
      .reduce((acc, current) => current.cards, []),
    inShop: state.user.inShop
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addToUserCards: cards => dispatch(addToUserCards(cards)),
    getCardsInShop: () => dispatch(getCardsInShop())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Shop)
