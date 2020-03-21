const PLAY_CARD = 'PLAY_CARD'
const DRAW_CARD = 'DRAW_CARD'
const ATTACK_CARD = 'ATTACK_CARD'
const ATTACK_HERO = 'ATTACK_HERO'
const HERO_DEAD = 'HERO_DEAD'
const GET_ALL_CARDS = 'GET_ALL_CARDS'

const initialState = {
  deck: [],
  inPlay: [],
  hand: [],
  settlers: 10
}

export default function(state = initialState, action) {
  switch (action.type) {
    case PLAY_CARD:
      return {
        ...state,
        inPlay: [...state.inPlay, action.card],
        hand: state.hand.filter(card => card._id !== action.card._id)
      }
    case DRAW_CARD:
      return {
        ...state,
        deck: action.deck,
        hand: [...state.hand, action.card]
      }
    case ATTACK_CARD:
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
