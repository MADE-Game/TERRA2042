const engine = {
  attack: (attacker, defender) => {
    const newAttacker = attacker
    const newDefender = defender
    newAttacker.health -= defender.attack
    newDefender.health -= attacker.attack
    newAttacker.attackOccurred = true
    return [newAttacker, newDefender]
  },

  heroAttack: (attacker, hero) => {
    const newHero = hero
    const newAttacker = attacker
    newHero.settlers -= attacker.attack
    newAttacker.attackOccurred = true
    return [newAttacker, newHero]
  },

  incrementSettlers: (hero, user) => {
    const newHero = hero

    if (user.selectedClass === 'Forager') {
      newHero.settlers += 2
    } else {
      newHero.settlers += 1
    }
    return hero
  },

  payCost: (hero, card) => {
    const newHero = hero
    newHero.settlers -= card.cost
    return newHero
  },
  drawCard: (deck, user) => {
    let randomNum = Math.floor(Math.random() * Math.floor(4))
    let card = {}
    if (user.selectedClass === 'Hoarder') {
      if (randomNum === 1) {
        card = deck.slice(0, 2)
        deck.shift()
        deck.shift()
      } else {
        card = deck.shift()
      }
    } else {
      card = deck.shift()
    }
    return {
      newDeck: deck,
      card
    }
  },
  hurtByDraw: hero => {
    const newHero = hero
    newHero.settlers -= 2
    return newHero
  },
  setClass: (hero, Class) => {
    const newHero = hero
    newHero.class = Class
    return newHero
  },
  cultistDraw: (deck, player) => {
    let card = deck.shift()
    const newPlayer = player
    newPlayer.settlers -= 2
    return {
      newDeck: deck,
      card,
      newPlayer
    }
  },
  medicHeal: fighter => {
    let newFighter = fighter
    newFighter.health += newFighter.health
    return newFighter
  },

  banditDecrement: (player, opponent) => {
    console.log('banditDecrement')
    let newOpponent = opponent
    let newPlayer = player
    newOpponent.settlers -= 4
    newPlayer.settlers -= 2
    return [newPlayer, newOpponent]
  },
  metalHeadPower: player => {
    let metalHeadMinion = {
      name: 'Minion',
      type: 'Fighter',
      imageUrl: '/images/monsters/30.png',
      cost: 2,
      attack: 2,
      health: 2,
      attackOccurred: true,
      _v: 0,
      _id: 1
    }
    let newPlayer = player
    newPlayer.settlers -= metalHeadMinion.cost
    return [metalHeadMinion, newPlayer]
  },
  clearAttack: fighter => {
    let newFighter = fighter
    newFighter.attackOccurred = false
    return newFighter
  }
}

export default engine
