const PLAY_CARD = 'PLAY_CARD'
const DRAW_CARD = 'DRAW_CARD'
const ATTACK_CARD = 'ATTACK_CARD'
const ATTACK_HERO = 'ATTACK_HERO'
const HERO_DEAD = 'HERO_DEAD'

import {attack, heroAttack} from '../engine/index'

const playedCard = card => ({
  type: PLAY_CARD,
  card
})
const AttackedCard = (attacker, defender) => ({
  type: ATTACK_CARD,
  attacker,
  defender
})
const AttackedHero = hero => ({
  type: ATTACK_HERO,
  hero
})
const heroDied = () => ({
  type: HERO_DEAD
})

const drewCard = (
  card = {
    name: 'Test',
    imageUrl: '/images/monsters/15.png',
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
export const attackHero = (attacker, hero) => {
  const result = heroAttack(attacker, hero)
  if (result.settlers <= 0) {
    return dispatch => dispatch(heroDied())
  } else {
    return dispatch => {
      dispatch(AttackedHero(result))
    }
  }
}
const dummyProps = {
  name: 'Test',
  imageUrl: '/images/monsters/12.png',
  attack: 1,
  defense: 4,
  id: 1
}
const dummyProps2 = {
  name: 'Test',
  imageUrl: '/images/monsters/15.png',
  attack: 1,
  defense: 4,
  id: 2
}
const dummyProps3 = {
  name: 'Test',
  imageUrl: '/images/monsters/8.png',
  attack: 1,
  defense: 4,
  id: 3
}
const dummyProps4 = {
  name: 'Test',
  imageUrl: '/images/monsters/17.png',
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
  player: {
    inPlay: [],
    hand: [dummyProps, dummyProps2, dummyProps3, dummyProps4],
    settlers: 10
  },
  enemy: {
    inPlay: [dummyProps9, dummyProps8],
    hand: [dummyProps7, dummyProps10],
    settlers: 10
  },
  isFinished: false
}

export default function(state = defaultGame, action) {
  switch (action.type) {
    case PLAY_CARD:
      return {
        ...state,
        player: {
          ...state.player,
          inPlay: [...state.player.inPlay, action.card],
          hand: state.player.hand.filter(function(card) {
            return card.id !== action.card.id
          })
        }
      }
    case DRAW_CARD:
      return {
        ...state,
        player: {...state.player, hand: [...state.player.hand, action.card]}
      }
    case ATTACK_CARD:
      return {
        ...state,
        player: {
          ...state.player,
          inPlay: state.player.inPlay.map(card => {
            if (card.id === action.attacker.id) {
              return action.attacker
            } else {
              return card
            }
          })
        },
        enemy: {
          ...state.enemy,
          inPlay: state.enemy.inPlay.map(card => {
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
    default:
      return state
  }
}
