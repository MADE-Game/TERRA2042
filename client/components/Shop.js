import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {addToUserCards} from '../store/reducers/user'

class Shop extends Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(cardId) {
    this.props.addToMyCards([...this.props.myCards, cardId])
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
          {Array(20)
            .fill(1)
            .map((item, idx) => {
              return (
                <ShopCard
                  key={item}
                  num={idx + 1}
                  handleClick={this.props.handleClick}
                />
              )
            })}
        </div>
      </div>
    )
  }
}

const ShopCard = ({num, handleClick}) => {
  return (
    <div
      id="card"
      className="card"
      style={{
        fontSize: 12,
        fontWeight: 'bold'
      }}
    >
      <div>
        <p
          style={{
            textAlign: 'right',
            paddingRight: '1em'
          }}
        >
          Cost: 1
        </p>
      </div>
      <img src={`/images/monsters/${num}.png`} style={{width: '11vh'}} />
      <h2
        style={{
          textAlign: 'center'
        }}
      >
        {name}
      </h2>
      <div
        className="stats"
        style={{
          // paddingRight: '1em',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly'
        }}
      >
        <span>~ attack ~</span>
        <span>~ health ~</span>
        <br />
      </div>
      <button type="button" className="buttonStyle1" onClick={handleClick}>
        Buy
      </button>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    userCards: state.user.collections
      .filter(coll => coll.isDeck === false)
      .map(coll => coll.cards)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addToUserCards: cards => dispatch(addToUserCards(cards))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Shop)
