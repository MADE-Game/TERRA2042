module.exports = {
  relativizeBoard: (game, userId) => {
    //if user is p1, set p1 to player
    const player =
      userId.toString() === game.p1 ? {...game.player1} : {...game.player2}
    //if user is p1, set p2 to opponent
    const opponent =
      userId.toString() === game.p1 ? {...game.player2} : {...game.player1}
    const gameToReturn = {
      player,
      opponent: {
        ...opponent,
        deck: opponent.deck.length,
        hand: opponent.hand.length
      }
    }
    return gameToReturn
  },
  objectifyBoard: (gameFromSave, gameInDB, userId) => {
    const isP1Player = userId.toString() === gameInDB.p1
    //if user is p1, set p2 to opponent
    if (isP1Player) {
      return {
        player2: {
          ...gameInDB.game.player2,
          inPlay: gameFromSave.opponent.inPlay,
          settlers: gameFromSave.opponent.settlers
        },
        player1: {
          ...gameInDB.player1,
          hand: gameFromSave.player.hand,
          inPlay: gameFromSave.player.inPlay,
          deck: gameFromSave.player.deck,
          settlers: gameFromSave.player.settlers
        }
      }
    } else {
      return {
        player1: {
          ...gameInDB.game.player1,
          inPlay: gameFromSave.opponent.inPlay,
          settlers: gameFromSave.opponent.settlers
        },
        player2: {
          ...gameInDB.player2,
          hand: gameFromSave.player.hand,
          inPlay: gameFromSave.player.inPlay,
          deck: gameFromSave.player.deck,
          settlers: gameFromSave.player.settlers
        }
      }
    }
  },
  validateBoard: function(boardToValidate, boardInDB) {
    //is it the players turn.
    throw new Error('Invalid move! You cannot do that')
  }
}
