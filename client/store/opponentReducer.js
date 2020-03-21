const PLAY_CARD = 'PLAY_CARD'
const DRAW_CARD = 'DRAW_CARD'
const ATTACK_CARD = 'ATTACK_CARD'
const ATTACK_HERO = 'ATTACK_HERO'
const HERO_DEAD = 'HERO_DEAD'
const GET_ALL_CARDS = 'GET_ALL_CARDS'

const dummyProps7 = {
  name: 'Test',
  imageUrl: 'favicon.ico',
  attack: 1,
  health: 4,
  cost: 1,
  id: 7
}

const dummyProps8 = {
  name: 'Test',
  imageUrl: 'favicon.ico',
  attack: 1,
  health: 4,
  cost: 1,
  id: 8
}

const dummyProps9 = {
  name: 'Test',
  imageUrl: 'favicon.ico',
  attack: 1,
  health: 4,
  cost: 1,
  id: 10
}
const dummyProps10 = {
  name: 'Test',
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
    case ATTACK_HERO:
      return {...state, settlers: action.hero.settlers}
    default:
      return state
  }
}
