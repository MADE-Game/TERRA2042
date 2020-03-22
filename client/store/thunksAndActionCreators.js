import {
  GET_ALL_CARDS,
  PLAYER_PLAY_CARD,
  PLAYER_ATTACK_CARD,
  ATTACK_HERO,
  PLAYER_HERO_DEAD,
  PLAYER_DRAW_CARD,
  OPP_HERO_DEAD,
  LOAD_GAME
} from './actionTypes'

import engine from '../engine/index'
import io from 'socket.io-client'
import Axios from 'axios'
const socket = io()

const gotAllCards = cards => ({
  type: GET_ALL_CARDS,
  cards
})
const loadedGame = game => ({
  type: LOAD_GAME,
  game
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
const playerAttackedHero = hero => ({
  type: ATTACK_HERO,
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

export const playerPlayCard = (hero, card) => {
  const result = engine.payCost(hero, card)
  if (result.settlers <= 0) {
    return dispatch => {
      dispatch(playerHeroDied())
    }
  }
  return dispatch => {
    socket.emit('play card', card)
    dispatch(playerPlayedCard(hero, card))
  }
}
//Retrieves all cards from the database

//[DEVELOPMENT]: This thunk will load the cards into the player deck.
export const getAllCards = () => {
  return async dispatch => {
    const {data: cards} = await Axios.get('/api/cards')
    dispatch(gotAllCards(cards))
  }
}
export const loadGame = () => {
  return async dispatch => {
    const {data} = await Axios.get('/api/games/load/test')
    const gameToSend = {...data.game, ...data._doc}
    console.log(gameToSend)
    dispatch(loadedGame(gameToSend))
  }
}
//the player attacks an enemy card[defender] with their own
//card[attacker].
export const playerAttackCard = (attacker, defender) => {
  const result = engine.attack(attacker, defender)
  return dispatch => {
    dispatch(playerAttackedCard(...result))
    socket.emit('attack', {
      attacker: result[0],
      defender: result[1]
    })
  }
}

//a player draws a card from their deck and adds it to their hand
export const playerDrawCard = deck => {
  const {newDeck, card} = engine.drawCard(deck)
  return dispatch => {
    socket.emit('draw card')
    dispatch(playerDrewCard(newDeck, card))
  }
}
export const playerAttackHero = (attacker, hero) => {
  const result = engine.heroAttack(attacker, hero)
  if (result.settlers <= 0) {
    return dispatch => dispatch(opponentHeroDied())
  } else {
    return dispatch => {
      dispatch(playerAttackedHero(result))
    }
  }
}
