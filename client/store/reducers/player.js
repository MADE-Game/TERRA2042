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
  MEDIC_HEAL,
  CLEAR_BOARD,
  // BANDIT_POWER,
  BANDIT_DECREMENT,
  BANDIT_ATTACK_ENGAGE,
  CLEAR_ATTACK,
  METAL_HEAD_POWER
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
  cultistHasDrawn: false,
  healUsed: false,
  banditUsed: false,
  banditAttackEngaged: false,
  metalHeadUsed: false
}

// eslint-disable-next-line complexity
export default function(state = initialState, action) {
  switch (action.type) {
    case LOAD_GAME:
      return {
        ...state,
        deck: action.game.game.player.deck,
        inPlay: action.game.game.player.inPlay,
        hand: action.game.game.player.hand,
        settlers: action.game.game.player.settlers
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
        cultistHasDrawn: false,
        healUsed: false,
        banditUsed: false,
        metalHeadUsed: false,
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
    case MEDIC_HEAL:
      return {
        ...state,
        inPlay: state.inPlay.map(card => {
          if (card._id === action.fighter._id) {
            return action.fighter
          } else {
            return card
          }
        }),
        healUsed: true
      }

    case BANDIT_DECREMENT:
      return {
        ...state,
        settlers: action.player.settlers,
        banditUsed: true
      }
    case BANDIT_ATTACK_ENGAGE:
      return {
        ...state,
        banditAttackEngaged: true
      }
    case CLEAR_ATTACK:
      return {
        ...state,
        inPlay: state.inPlay.map(card => {
          if (card._id === action.fighter._id) {
            return action.fighter
          } else {
            return card
          }
        }),
        banditUsed: true,
        banditEngaged: false
      }
    case METAL_HEAD_POWER:
      // eslint-disable-next-line no-case-declarations
      let idArray = state.inPlay.map(card => {
        return card._id
      })
      if (!state.planeFull) {
        if (!idArray.includes(action.fighter._id)) {
          return {
            ...state,
            inPlay: [...state.inPlay, action.fighter],
            settlers: action.player.settlers,
            metalHeadUsed: true
          }
        } else {
          // eslint-disable-next-line no-alert
          alert('You can only play one minion at a time')
          return state
        }
      } else {
        // eslint-disable-next-line no-alert
        alert('Plane is full!')
        return state
      }

    default:
      return state
  }
}
