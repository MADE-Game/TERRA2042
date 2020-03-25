import {
  PLAYER_HERO_DEAD,
  OPP_HERO_DEAD,
  LOAD_GAME,
  END_TURN
} from '../actionTypes'

const initialState = {
  isFinished: false,
  isMyTurn: true,
  winner: ''
}

export default function(state = initialState, action) {
  switch (action.type) {
    case LOAD_GAME:
      return {...state, isMyTurn: action.game.game.data.isMyTurn}
    case END_TURN:
      return {...state, isMyTurn: false}
    case PLAYER_HERO_DEAD:
      return {...state, isFinished: true, winner: 'opponent'}
    case OPP_HERO_DEAD:
      return {...state, isFinished: true, winner: 'player'}
    default:
      return state
  }
}
