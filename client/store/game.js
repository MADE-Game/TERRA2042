const PLAY_CARD = 'PLAY_CARD'
const DRAW_CARD = 'DRAW_CARD'
const ATTACK_CARD = 'ATTACK_CARD'
const ATTACK_HERO = 'ATTACK_HERO'
const HERO_DEAD = 'HERO_DEAD'
const GET_ALL_CARDS = 'GET_ALL_CARDS'

import player from './playerReducer'
import opponent from './opponentReducer'
import data from './gameDataReducer'

import engine from '../engine/index'
import Axios from 'axios'
import {combineReducers} from 'redux'

// const defaultGame = {
//   player: {
//     deck: [],
//     inPlay: [],
//     hand: [],
//     settlers: 10
//   },
//   enemy: {
//     inPlay: [dummyProps9, dummyProps8],
//     hand: [dummyProps7, dummyProps10],
//     settlers: 10
//   },
//   isFinished: false
// }

const oldReducer = function(state = defaultGame, action) {
  switch (action.type) {
    case PLAY_CARD:
      return {
        ...state,
        player: {
          ...state.player,
          inPlay: [...state.player.inPlay, action.card],
          hand: state.player.hand.filter(function(card) {
            return card._id !== action.card._id
          }),
          settlers: action.hero.settlers
        }
      }
    case DRAW_CARD:
      return {
        ...state,
        player: {
          ...state.player,
          deck: action.deck,
          hand: [...state.player.hand, action.card]
        }
      }
    case ATTACK_CARD:
      return {
        ...state,
        player: {
          ...state.player,
          inPlay: state.player.inPlay
            .filter(card => card.health > 0)
            .map(card => {
              if (card._id === action.attacker._id) {
                return action.attacker
              } else {
                return card
              }
            })
        },
        enemy: {
          ...state.enemy,
          inPlay: state.enemy.inPlay
            .filter(card => card.health > 0)
            .map(card => {
              if (card.id === action.defender.id) {
                return action.defender
              } else {
                return card
              }
            })
        }
      }
    case ATTACK_HERO:
      return {...state, enemy: {...state.enemy, settlers: action.hero.settlers}}
    case HERO_DEAD:
      return {...state, isFinished: true}
    case GET_ALL_CARDS:
      return {...state, player: {...state.player, deck: action.cards}}
    default:
      return state
  }
}
// export default oldReducer;
export default combineReducers({player, opponent, data})
