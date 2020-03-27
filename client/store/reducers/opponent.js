import {PLAYER_ATTACK_CARD, PLAYER_ATTACK_HERO, LOAD_GAME} from '../actionTypes'

const initialState = {
  deck: 0,
  inPlay: [],
  hand: 0,
  settlers: 20
}

export default function(state = initialState, action) {
  switch (action.type) {
    case LOAD_GAME:
      return {
        ...state,
        inPlay: action.game.game.opponent.inPlay,
        hand: action.game.game.opponent.hand,
        deck: action.game.game.opponent.deck,
        settlers: action.game.game.opponent.settlers
      }
    case PLAYER_ATTACK_CARD:
      return {
        ...state,
        inPlay: state.inPlay
          .filter(card => card.health > 0)
          .map(card => {
            if (card.id === action.defender._id) {
              return action.defender
            } else {
              return card
            }
          })
      }
    case PLAYER_ATTACK_HERO:
      return {...state, settlers: action.hero.settlers}
    default:
      return state
  }
}
