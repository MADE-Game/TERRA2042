import {PLAYER_HERO_DEAD, OPP_HERO_DEAD} from './actionTypes'

const initialState = {
  isFinished: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case PLAYER_HERO_DEAD:
      return {...state, isFinished: true}
    case OPP_HERO_DEAD:
      return {...state, isFinished: true}
    default:
      return state
  }
}
