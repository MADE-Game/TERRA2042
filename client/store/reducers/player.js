import {
  PLAYER_ATTACK_CARD,
  PLAYER_DRAW_CARD,
  PLAYER_PLAY_CARD,
  GET_ALL_CARDS,
  LOAD_GAME,
  END_TURN,
  HURT_BY_DRAW
} from '../actionTypes'

const initialState = {
  deck: [],
  inPlay: [],
  hand: [],
  settlers: 10,
  planeFull: false
}

// eslint-disable-next-line complexity
export default function(state = initialState, action) {
  switch (action.type) {
    case LOAD_GAME:
      return {
        ...state,
        deck: action.game.player.deck,
        inPlay: action.game.player.inPlay,
        hand: action.game.player.hand,
        settlers: action.game.player.settlers
      }
    case PLAYER_PLAY_CARD:
      if (state.inPlay.length < 4) {
        return {
          ...state,
          inPlay: [...state.inPlay, action.card],
          hand: state.hand.filter(card => card._id !== action.card._id)
        }
      } else if (state.inPlay.length === 4) {
        return {
          ...state,
          inPlay: [...state.inPlay, action.card],
          hand: state.hand.filter(card => card._id !== action.card._id),
          planeFull: true
        }
      } else {
        return {
          ...state,
          planeFull: true
        }
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
    case END_TURN:
      return {
        ...state,
        inPlay: state.inPlay.map(function(card) {
          card.attackOccurred = false
          return card
        })
      }
    case HURT_BY_DRAW:
      return {
        ...state,
        settlers: action.hero.settlers
      }
    default:
      return state
  }
}
