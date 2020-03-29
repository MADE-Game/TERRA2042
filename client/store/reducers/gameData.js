import {
  PLAYER_HERO_DEAD,
  OPP_HERO_DEAD,
  LOAD_GAME,
  END_TURN,
  START_TURN
} from '../actionTypes'

const initialState = {
  localTurn: false,
  isFinished: false,
  isMyTurn: true,
  winner: ''
}

export default function(state = initialState, action) {
  switch (action.type) {
    case LOAD_GAME:
      return {
        ...state,
        isFinished: action.game.isFinished,
        isMyTurn: action.game.game.data.isMyTurn,
        localTurn: action.game.game.data.isMyTurn
      }
    case END_TURN:
      return {...state, isMyTurn: false, localTurn: false}
    case START_TURN:
      return {...state, isMyTurn: true}
    case PLAYER_HERO_DEAD:
      return {...state, isFinished: true, winner: 'opponent'}
    case OPP_HERO_DEAD:
      return {...state, isFinished: true, winner: 'player'}
    default:
      return state
  }
}
