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
    console.log('logging in increment', user)
    if (!user) {
      user = {selectedClass: 'muhClass'}
    }
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
  drawCard: deck => {
    const card = deck.shift()
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
  }
}

export default engine
