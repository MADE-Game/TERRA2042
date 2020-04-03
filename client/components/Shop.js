/* eslint-disable no-alert */
import React, {Component} from 'react'
import {ShopCard} from './ShopCard'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {addToUserCards, getCardsInShop} from '../store/reducers/user'
import {toast} from 'react-toastify'
import {confirmAlert} from 'react-confirm-alert'
import {fadeIn, fadeOutUp} from 'react-animations'
import styled, {keyframes} from 'styled-components'
import {MyButton as Button} from './Button'
import {Pagination} from '@material-ui/lab'
import 'react-toastify/dist/ReactToastify.css'
import 'react-confirm-alert/src/react-confirm-alert.css'

const Fade = styled.div`
  animation: 2s ${keyframes`${fadeIn}`};
`

const FadeUp = styled.div`
  animation: 1s ${keyframes`${fadeOutUp}`};
`

class Shop extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
    this.state = {
      page: 1,
      recentlyBought: ''
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
              this.setState({
                recentlyBought: cardId
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
        <div style={{width: '25%'}}>
          <Link to="/home">
            <Button text="Home" color="default" icon="home" />
          </Link>
        </div>
        <span>Gold {this.props.gold}</span>
        {/* // still need the to implement with arrows */}

        <Fade>
          <div id="shop-cards">
            {this.props.inShop
              .slice((this.state.page - 1) * 8, this.state.page * 8)
              .map(card => {
                return this.state.recentlyBought !== card._id ? (
                  <ShopCard
                    key={card._id}
                    card={card}
                    handleClick={(cardId, cardCost) =>
                      this.handleClick(event, cardId, cardCost)
                    }
                  />
                ) : (
                  <FadeUp>
                    <ShopCard key={card._id} card={card} />
                  </FadeUp>
                )
              })}
          </div>
        </Fade>
        <Pagination
          page={this.state.page}
          count={Math.ceil(this.props.inShop.length / 8)}
          size="large"
          hideNextButton={true}
          hidePrevButton={true}
          color="secondary"
          onChange={event => this.setState({page: +event.target.innerText})}
        />
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
