import {PLAYER_ATTACK_CARD, PLAYER_ATTACK_HERO} from '../actionTypes'

const dummyProps7 = {
  name: 'dp7',
  imageUrl: 'favicon.ico',
  attack: 1,
  health: 4,
  cost: 1,
  id: 7
}

const dummyProps8 = {
  name: 'dp8',
  imageUrl: 'favicon.ico',
  attack: 1,
  health: 4,
  cost: 1,
  id: 8
}

const dummyProps9 = {
  name: 'dp9',
  imageUrl: 'favicon.ico',
  attack: 1,
  health: 4,
  cost: 1,
  id: 10
}
const dummyProps10 = {
  name: 'dp10',
  imageUrl: 'favicon.ico',
  attack: 1,
  health: 4,
  cost: 1,
  id: 9
}
const initialState = {
  deck: [],
  inPlay: [dummyProps9, dummyProps8],
  hand: [dummyProps7, dummyProps10],
  settlers: 10
}

export default function(state = initialState, action) {
  switch (action.type) {
    case PLAYER_ATTACK_CARD:
      return {
        ...state,
        inPlay: state.inPlay
          .filter(card => card.health > 0)
          .map(card => {
            if (card.id === action.defender.id) {
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
