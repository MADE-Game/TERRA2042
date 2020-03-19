const PLAY_CARD = 'PLAY_CARD'
const DRAW_CARD = 'DRAW_CARD'
const ATTACK_CARD = 'ATTACK_CARD'

import {attack} from '../engine/index'

const playedCard = card => ({
  type: PLAY_CARD,
  card
})
const AttackedCard = (attacker, defender) => ({
  type: ATTACK_CARD,
  attacker,
  defender
})

const drewCard = (
  card = {
    name: 'Test',
    imageUrl: 'favicon.ico',
    attack: 1,
    defense: 4,
    id: 5
  }
) => ({
  type: DRAW_CARD,
  card
})

export const playCard = card => {
  return dispatch => {
    dispatch(playedCard(card))
  }
}
export const attackCard = (attacker, defender) => {
  const result = attack(attacker, defender)

  return dispatch => {
    dispatch(AttackedCard(...result))
  }
}
export const drawCard = () => {
  return dispatch => {
    dispatch(drewCard())
  }
}
const dummyProps = {
  name: 'Test',
  imageUrl: 'favicon.ico',
  attack: 1,
  defense: 4,
  id: 1
}
const dummyProps2 = {
  name: 'Test',
  imageUrl: 'favicon.ico',
  attack: 1,
  defense: 4,
  id: 2
}
const dummyProps3 = {
  name: 'Test',
  imageUrl: 'favicon.ico',
  attack: 1,
  defense: 4,
  id: 3
}
const dummyProps4 = {
  name: 'Test',
  imageUrl: 'favicon.ico',
  attack: 1,
  defense: 4,
  id: 4
}

const dummyProps7 = {
  name: 'Test',
  imageUrl: 'favicon.ico',
  attack: 1,
  defense: 4,
  id: 7
}

const dummyProps8 = {
  name: 'Test',
  imageUrl: 'favicon.ico',
  attack: 1,
  defense: 4,
  id: 8
}

const dummyProps9 = {
  name: 'Test',
  imageUrl: 'favicon.ico',
  attack: 1,
  defense: 4,
  id: 9
}
const dummyProps10 = {
  name: 'Test',
  imageUrl: 'favicon.ico',
  attack: 1,
  defense: 4,
  id: 9
}

const defaultGame = {
  player1: {
    inPlay: [],
    hand: [dummyProps, dummyProps2, dummyProps3, dummyProps4]
  },
  player2: {
    inPlay: [dummyProps9, dummyProps8],
    hand: [dummyProps7, dummyProps10]
  }
}

export default function(state = defaultGame, action) {
  switch (action.type) {
    case PLAY_CARD:
      return {
        ...state,
        player1: {
          ...state.player1,
          inPlay: [...state.player1.inPlay, action.card],
          hand: state.player1.hand.filter(function(card) {
            return card.id !== action.card.id
          })
        }
      }
    case DRAW_CARD:
      return {
        ...state,
        player1: {...state.player1, hand: [...state.player1.hand, action.card]}
      }
    case ATTACK_CARD:
      return {
        ...state,
        player1: {
          ...state.player1,
          inPlay: state.player1.inPlay.map(card => {
            if (card.id === action.attacker.id) {
              return action.attacker
            } else {
              return card
            }
          })
        },
        player2: {
          ...state.player2,
          inPlay: state.player2.inPlay.map(card => {
            if (card.id === action.defender.id) {
              return action.defender
            } else {
              return card
            }
          })
        }
      }
    default:
      return state
  }
}
