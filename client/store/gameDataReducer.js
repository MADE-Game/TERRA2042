import {HERO_DEAD} from './actionTypes'

const initialState = {
  isFinished: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case HERO_DEAD:
      console.log('hit reducer for hero died')
      return {...state, isFinished: true}
    default:
      return state
  }
}
