/* eslint-disable no-alert */
import React, {Component} from 'react'
import {ShopCard} from './ShopCard'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {addToUserCards, getCardsInShop} from '../store/reducers/user'
import {toast} from 'react-toastify'
import {confirmAlert} from 'react-confirm-alert'
import {fadeIn} from 'react-animations'
import styled, {keyframes} from 'styled-components'
import {Pagination} from '@material-ui/lab'
import 'react-toastify/dist/ReactToastify.css'
import 'react-confirm-alert/src/react-confirm-alert.css'

const Fade = styled.div`
  animation: 3s ${keyframes`${fadeIn}`};
`

class Shop extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
    this.state = {
      page: 1
    }
  }

  componentDidMount() {
    this.props.getCardsInShop()
  }

  handleClick(event, cardId, cardCost) {
    if (this.props.gold < cardCost)
      toast.error('Not enough gold!', {
        position: toast.POSITION.TOP_CENTER
      })
    else {
      confirmAlert({
        title: 'Confirm',
        message: 'Please confirm your purchase',
        buttons: [
          {
            label: 'Buy',
            onClick: () => {
              this.props.addToUserCards(
                [...this.props.userCards, cardId],
                cardCost
              )
              event.target.setAttribute('disabled', true)
              toast.success('Purchase successful!', {
                position: toast.POSITION.TOP_CENTER
              })
            }
          },
          {
            label: 'Cancel'
          }
        ]
      })
    }
  }

  render() {
    return (
      <div id="shop">
        <Link to="/home">
          <button type="button" className="buttonStyle1">
            Home
          </button>
        </Link>
        <span>Gold {this.props.gold}</span>
        <Pagination
          page={this.state.page}
          count={Math.ceil(this.props.inShop.length / 12)}
          size="large"
          hideNextButton={true}
          hidePrevButton={true}
          onChange={event => this.setState({page: +event.target.innerText})}
        />
        <Fade>
          <div id="shop-cards">
            {this.props.inShop
              .slice((this.state.page - 1) * 12, this.state.page * 12)
              .map(card => {
                return (
                  <ShopCard
                    key={card._id}
                    card={card}
                    handleClick={(cardId, cardCost) =>
                      this.handleClick(event, cardId, cardCost)
                    }
                  />
                )
              })}
          </div>
        </Fade>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    gold: state.user.gold,
    userCards: state.user.collections
      .filter(coll => !coll.isDeck)
      .reduce((acc, current) => current.cards, []),
    inShop: state.user.inShop
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addToUserCards: (cards, cardCost) =>
      dispatch(addToUserCards(cards, cardCost)),
    getCardsInShop: () => dispatch(getCardsInShop())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Shop)
