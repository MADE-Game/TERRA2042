import {
  PLAYER_ATTACK_CARD,
  PLAYER_DRAW_CARD,
  PLAYER_PLAY_CARD,
  GET_ALL_CARDS,
  LOAD_GAME,
  END_TURN,
  HURT_BY_DRAW,
  PLAYER_ATTACK_HERO,
  INCREMENT_SETTLERS,
  CULTIST_DRAW,
  CLEAR_BOARD
} from '../actionTypes'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const initialState = {
  deck: [],
  inPlay: [],
  hand: [],
  settlers: 20,
  planeFull: false,
  drawsThisTurn: 0,
  drawLimit: 1,
  cultistHasDrawn: false
}

// eslint-disable-next-line complexity
export default function(state = initialState, action) {
  switch (action.type) {
    case LOAD_GAME:
      console.log('pay load on load', action)
      return {
        ...state,
        deck: action.game.game.player.deck,
        inPlay: action.game.game.player.inPlay,
        hand: action.game.game.player.hand,
        settlers: action.game.game.player.settlers,
        drawsThisTurn: action.game.game.player.drawsThisTurn,
        drawLimit: action.game.game.player.drawLimit,
        cultistHasDrawn: action.game.game.player.cultistHasDrawn
      }
    case CLEAR_BOARD:
      return initialState
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
          planeFull: true,
          settlers: state.settlers + action.card.cost
        }
      }
    case PLAYER_DRAW_CARD:
      if (state.drawsThisTurn < state.drawLimit) {
        if (!Array.isArray(action.card)) {
          return {
            ...state,
            deck: action.deck,
            hand: [...state.hand, action.card],
            drawsThisTurn: state.drawsThisTurn + 1
          }
        } else {
          return {
            ...state,
            deck: action.deck,
            hand: [...state.hand, action.card[0], action.card[1]],
            drawsThisTurn: state.drawsThisTurn + 1
          }
        }
      } else {
        toast.warning("You can't draw any more cards this turn!", {
          position: toast.POSITION.TOP_CENTER
        })
        return state
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
          }),
        planeFull: false
      }
    case GET_ALL_CARDS:
      return {...state, deck: action.cards}
    case END_TURN:
      return {
        ...state,
        inPlay: state.inPlay.map(function(card) {
          card.attackOccurred = false
          return card
        }),

        drawsThisTurn: 0,
        planeFull: false
      }
    case HURT_BY_DRAW:
      return {
        ...state,
        settlers: action.hero.settlers
      }
    case PLAYER_ATTACK_HERO:
      return {
        ...state,
        inPlay: state.inPlay.map(card => {
          if (card._id === action.attacker._id) {
            return action.attacker
          } else {
            return card
          }
        })
      }
    case INCREMENT_SETTLERS:
      return {
        ...state,
        settlers: action.hero.settlers
      }
    case CULTIST_DRAW:
      if (!state.cultistHasDrawn) {
        return {
          ...state,
          settlers: action.player.settlers,
          deck: action.deck,
          hand: [...state.hand, action.card],
          cultistHasDrawn: true
        }
      } else {
        // eslint-disable-next-line no-alert
        alert('A cultist can only use the draw card power once per turn')
        return state
      }

    default:
      return state
  }
}
