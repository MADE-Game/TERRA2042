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
  CULTIST_DRAW
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

export const endTurn = () => async dispatch => {
  await dispatch(endedTurn())
}
export const startTurn = () => dispatch => {
  dispatch(startedTurn())
}

export const incrementTheSettlers = (hero, user) => async dispatch => {
  const result = engine.incrementSettlers(hero, user)
  await dispatch(incrementedSettlers(result))
}
export const cultistDrawCard = (deck, player) => {
  const result = engine.cultistDraw(deck, player)
  return async dispatch => {
    await dispatch(cultistDrew(result.newDeck, result.card, result.newPlayer))
    socket.emit('draw card')
  }
}

export const playerPlayCard = (hero, card) => {
  const result = engine.payCost(hero, card)
  if (result.settlers <= 0) {
    return async dispatch => {
      await dispatch(playerHeroDied())
      socket.emit('game over')
    }
  }
  return async dispatch => {
    await dispatch(playerPlayedCard(hero, card))
    socket.emit('play card', card)
    var today = new Date()
    var time = today
    console.log(time.getUTCMinutes())
    console.log(time.getUTCSeconds())
    console.log(time.getUTCMilliseconds())
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
  return async dispatch => {
    await dispatch(playerAttackedCard(...result))
    socket.emit('attack', {
      attacker: result[0],
      defender: result[1]
    })
  }
}

//a player draws a card from their deck and adds it to their hand
export const playerDrawCard = (deck, user) => {
  const {newDeck, card} = engine.drawCard(deck, user)
  return async dispatch => {
    await dispatch(playerDrewCard(newDeck, card))
    socket.emit('draw card')
  }
}
export const playerAttackHero = (attacker, hero) => {
  const result = engine.heroAttack(attacker, hero)
  if (result[1].settlers <= 0) {
    return async dispatch => {
      await dispatch(opponentHeroDied())
      socket.emit('game over')
    }
  } else {
    return dispatch => {
      dispatch(playerAttackedHero(...result))
    }
  }
}
export const loadGame = id => {
  return async dispatch => {
    const {data: game} = await Axios.get(`/api/games/load/${id}`)
    dispatch(loadedGame(game))
  }
}
export const saveGame = (id, gameState) => {
  return async dispatch => {
    try {
      console.log('logging gameState in saveGame', gameState)
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
      socket.emit('game over')
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
