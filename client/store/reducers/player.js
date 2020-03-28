import {
  PLAYER_ATTACK_CARD,
  PLAYER_DRAW_CARD,
  PLAYER_PLAY_CARD,
  GET_ALL_CARDS,
  LOAD_GAME,
  END_TURN,
  HURT_BY_DRAW,
  PLAYER_ATTACK_HERO,
  INCREMENT_SETTLERS
} from '../actionTypes'

const initialState = {
  deck: [],
  inPlay: [],
  hand: [],
  settlers: 20,
  planeFull: false,
  drawsThisTurn: 0,
  drawLimit: 1
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
        return {
          ...state,
          deck: action.deck,
          hand: [...state.hand, action.card],
          drawsThisTurn: state.drawsThisTurn + 1
        }
      } else {
        // eslint-disable-next-line no-alert
        alert("You can't draw any more cards this turn")
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
    default:
      return state
  }
}
