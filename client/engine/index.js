const engine = {
  attack: (attacker, defender) => {
    const newAttacker = attacker
    const newDefender = defender
    newAttacker.health -= defender.attack
    newDefender.health -= attacker.attack
    return [newAttacker, newDefender]
  },

  heroAttack: (attacker, hero) => {
    const newHero = hero
    newHero.settlers -= attacker.attack
    return newHero
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
  }
}

export default engine

