import {
  PLAYER_ATTACK_CARD,
  PLAYER_DRAW_CARD,
  PLAYER_PLAY_CARD,
  GET_ALL_CARDS
} from '../actionTypes'

const initialState = {
  deck: [],
  inPlay: [],
  hand: [],
  settlers: 10
}

export default function(state = initialState, action) {
  switch (action.type) {
    case PLAYER_PLAY_CARD:
      return {
        ...state,
        inPlay: [...state.inPlay, action.card],
        hand: state.hand.filter(card => card._id !== action.card._id)
      }
    case PLAYER_DRAW_CARD:
      return {
        ...state,
        deck: action.deck,
        hand: [...state.hand, action.card]
      }
    case PLAYER_ATTACK_CARD:
      return {
        ...state,
        inPlay: state.inPlay
          .filter(card => card.health > 0)
          .map(card => {
            if (card._id === action.attacker._id) {
              return action.attacker
            } else {
              return card
            }
          })
      }
    case GET_ALL_CARDS:
      return {...state, deck: action.cards}
    default:
      return state
  }
}
