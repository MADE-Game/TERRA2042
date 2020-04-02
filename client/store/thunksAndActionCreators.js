import {
  GET_ALL_CARDS,
  PLAYER_PLAY_CARD,
  PLAYER_ATTACK_CARD,
  PLAYER_ATTACK_HERO,
  PLAYER_HERO_DEAD,
  PLAYER_DRAW_CARD,
  OPP_HERO_DEAD,
  LOAD_GAME,
  SAVE_GAME,
  END_TURN,
  HURT_BY_DRAW,
  START_TURN,
  INCREMENT_SETTLERS,
  CULTIST_DRAW,
  MEDIC_HEAL,
  CLEAR_BOARD,
  BANDIT_DECREMENT,
  METAL_HEAD_POWER,
  BANDIT_ATTACK_ENGAGE,
  CLEAR_ATTACK,
  GIVE_GOLD,
  ENGAGE_HEAL
} from './actionTypes'

import engine from '../engine/index'
import Axios from 'axios'
import {socket} from '../components/Room'

const gotAllCards = cards => ({
  type: GET_ALL_CARDS,
  cards
})
const cultistDrew = (deck, card, player) => ({
  type: CULTIST_DRAW,
  deck,
  player,
  card
})
export const engagedHeal = () => ({
  type: ENGAGE_HEAL
})
const clearedAttack = fighter => ({
  type: CLEAR_ATTACK,
  fighter
})
const banditDecrement = (player, opponent) => ({
  type: BANDIT_DECREMENT,
  player,
  opponent
})
const clearedBoard = () => ({
  type: CLEAR_BOARD
})
const incrementedSettlers = hero => ({
  type: INCREMENT_SETTLERS,
  hero
})
const loadedGame = game => ({
  type: LOAD_GAME,
  game
})
const savedGame = () => ({
  type: SAVE_GAME
})

const playerPlayedCard = (hero, card) => ({
  type: PLAYER_PLAY_CARD,
  hero,
  card
})

const playerAttackedCard = (attacker, defender) => ({
  type: PLAYER_ATTACK_CARD,
  attacker,
  defender
})
const playerAttackedHero = (attacker, hero) => ({
  type: PLAYER_ATTACK_HERO,
  attacker,
  hero
})

const playerHeroDied = () => ({
  type: PLAYER_HERO_DEAD
})

const opponentHeroDied = () => ({
  type: OPP_HERO_DEAD
})

const playerDrewCard = (deck, card) => ({
  type: PLAYER_DRAW_CARD,
  card,
  deck
})

const hurtByDrawnCard = hero => ({
  type: HURT_BY_DRAW,
  hero
})

const endedTurn = () => ({
  type: END_TURN
})
const startedTurn = () => ({
  type: START_TURN
})

const medicHealed = fighter => ({
  type: MEDIC_HEAL,
  fighter
})

const banditAttackEngaged = () => ({
  type: BANDIT_ATTACK_ENGAGE
})
const metalHeadSummoned = (fighter, player) => ({
  type: METAL_HEAD_POWER,
  fighter,
  player
})

export const endTurn = () => async dispatch => {
  await dispatch(endedTurn())
}
export const startTurn = () => dispatch => {
  dispatch(startedTurn())
}
export const medicHealPower = fighter => dispatch => {
  const result = engine.medicHeal(fighter)
  dispatch(medicHealed(result))
}
export const clearAttackThunk = fighter => dispatch => {
  const result = engine.clearAttack(fighter)
  dispatch(clearedAttack(result))
}
export const gotGold = amt => ({
  type: GIVE_GOLD,
  amt
})

export const banditDecrementThunk = (player, opponent) => async dispatch => {
  const result = engine.banditDecrement(player, opponent)
  if (result[1].settlers <= 0) {
    await dispatch(opponentHeroDied())
    socket.emit('game over', {roomId: localStorage.roomId, winner: 'player'})
  }
  if (result[0].settlers <= 0) {
    await dispatch(playerHeroDied())
    socket.emit('game over', {roomId: localStorage.roomId, winner: 'opponent'})
  }
  dispatch(banditDecrement(...result))
}
export const metalHeadSummon = player => async dispatch => {
  const result = engine.metalHeadPower(player)
  if (result[1].settlers <= 0) {
    await dispatch(playerHeroDied())
    socket.emit('game over', {roomId: localStorage.roomId, winner: 'opponent'})
  }
  dispatch(metalHeadSummoned(...result))
}

export const incrementTheSettlers = (hero, user) => async dispatch => {
  const result = engine.incrementSettlers(hero, user)
  await dispatch(incrementedSettlers(result))
}
export const cultistDrawCard = (deck, player) => {
  return async dispatch => {
    const result = engine.cultistDraw(deck, player)
    if (result.newPlayer.settlers <= 0) {
      await dispatch(playerHeroDied())
      socket.emit('game over', {
        roomId: localStorage.roomId,
        winner: 'opponent'
      })
    }
    console.log('logging cultist result', result)
    await dispatch(cultistDrew(result.newDeck, result.card, result.newPlayer))
    socket.emit('draw card', {roomId: localStorage.roomId})
  }
}
export const banditEngage = () => {
  return dispatch => dispatch(banditAttackEngaged())
}
export const playerPlayCard = (hero, card) => {
  const result = engine.payCost(hero, card)
  if (result.settlers <= 0) {
    return async dispatch => {
      await dispatch(playerHeroDied())
      socket.emit('game over', {
        roomId: localStorage.roomId,
        winner: 'opponent'
      })
    }
  }
  return async dispatch => {
    await dispatch(playerPlayedCard(hero, card))
    socket.emit('play card', {
      card,
      roomId: localStorage.roomId
    })
  }
}
//Retrieves all cards from the database

//[DEVELOPMENT]: This thunk will load the cards into the player deck.
export const getAllCards = () => {
  return async dispatch => {
    const {data: cards} = await Axios.get('/api/cards')
    let theCards = cards.map(function(card) {
      card = {...card, attackOccurred: false}
      return card
    })

    dispatch(gotAllCards(theCards))
  }
}

//the player attacks an enemy card[defender] with their own
//card[attacker].
export const playerAttackCard = (attacker, defender) => {
  const result = engine.attack(attacker, defender)
  return dispatch => {
    setTimeout(() => {
      dispatch(playerAttackedCard(...result))
      socket.emit('attack', {
        attacker: result[0],
        defender: result[1],
        roomId: localStorage.roomId
      })
    }, 1000)
  }
}

export const giveGold = amt => {
  return dispatch => {
    dispatch(gotGold(amt))
  }
}

//a player draws a card from their deck and adds it to their hand
export const playerDrawCard = (deck, user) => {
  const {newDeck, card} = engine.drawCard(deck, user)
  return async dispatch => {
    await dispatch(playerDrewCard(newDeck, card))
    socket.emit('draw card', {roomId: localStorage.roomId})
  }
}
export const playerAttackHero = (attacker, hero) => {
  const result = engine.heroAttack(attacker, hero)
  if (result[1].settlers <= 0) {
    return async dispatch => {
      await dispatch(opponentHeroDied())
      socket.emit('game over', {roomId: localStorage.roomId, winner: 'player'})
    }
  } else {
    return dispatch => {
      dispatch(playerAttackedHero(...result))
      socket.emit('hero attacked', {roomId: localStorage.roomId})
    }
  }
}
export const loadGame = id => {
  return async dispatch => {
    const {data: game} = await Axios.get(`/api/games/load/${id}`)
    dispatch(loadedGame(game))
  }
}
export const clearBoard = () => {
  return dispatch => {
    dispatch(clearedBoard())
  }
}
export const saveGame = (id, gameState) => {
  return async dispatch => {
    try {
      await Axios.put('/api/games/save/' + id, gameState)
      dispatch(savedGame())
    } catch (error) {
      if (error.response) {
        console.error(error.response.data)
      } else {
        console.log('Error', error)
      }
    }
  }
}
export const hurtByTheDraw = hero => {
  const result = engine.hurtByDraw(hero)
  if (result.settlers <= 0) {
    return dispatch => {
      dispatch(playerHeroDied())
      socket.emit('game over', {
        roomId: localStorage.roomId,
        winner: 'opponent'
      })
    }
  } else {
    return dispatch => dispatch(hurtByDrawnCard(result))
  }
}

export const startGame = (p1Id, p2Id, class1, class2) => {
  return async () => {
    const {data: game} = await Axios.post('/api/games/newGame', {
      p1: p1Id,
      p2: p2Id,
      class1,
      class2
    })
    return game._id
  }
}

export const updateUserGames = (userId, userData) => {
  return async () => {
    await Axios.put(`/api/users/${userId}`, userData)
  }
}
