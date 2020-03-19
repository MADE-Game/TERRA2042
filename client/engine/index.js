export const attack = (attacker, defender) => {
  const newAttacker = attacker
  const newDefender = defender
  newAttacker.defense -= defender.attack
  newDefender.defense -= attacker.attack
  return [newAttacker, newDefender]
}
