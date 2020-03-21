import {PLAYER_HERO_DEAD, OPP_HERO_DEAD} from '../actionTypes'

const initialState = {
  isFinished: false,
  winner: ''
}

export default function(state = initialState, action) {
  switch (action.type) {
    case PLAYER_HERO_DEAD:
      return {...state, isFinished: true, winner: 'opponent'}
    case OPP_HERO_DEAD:
      return {...state, isFinished: true, winner: 'player'}
    default:
      return state
  }
}
