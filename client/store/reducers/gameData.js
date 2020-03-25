import {PLAYER_HERO_DEAD, OPP_HERO_DEAD, LOAD_GAME} from '../actionTypes'

const initialState = {
  isFinished: false,
  isMyTurn: false,
  winner: ''
}

export default function(state = initialState, action) {
  switch (action.type) {
    case LOAD_GAME:
      return {...state, isMyTurn: action.game.game.data.isMyTurn}
    case PLAYER_HERO_DEAD:
      return {...state, isFinished: true, winner: 'opponent'}
    case OPP_HERO_DEAD:
      return {...state, isFinished: true, winner: 'player'}
    default:
      return state
  }
}
