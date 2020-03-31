const relativizeBoard = (game, userId) => {
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
    },
    data: {
      isMyTurn: game.isMyTurn
    }
  }
  return gameToReturn
}
//Shout out Fisher-Yates!
const shuffleDeck = deck => {
  let i = deck.length,
    k,
    temp
  const shuffledDeck = [...deck]
  while (--i > 0) {
    k = Math.floor(Math.random() * (i + 1))
    temp = shuffledDeck[k]
    shuffledDeck[k] = shuffledDeck[i]
    shuffledDeck[i] = temp
  }
  return shuffledDeck
}

const objectifyBoard = (gameFromSave, gameInDB, userId) => {
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
        settlers: gameFromSave.player.settlers,
        class: gameFromSave.player.class
      }
    }
  } else {
    return {
      player1: {
        ...gameInDB.game.player1,
        inPlay: gameFromSave.opponent.inPlay,
        settlers: gameFromSave.opponent.settlers,
        class: gameFromSave.player.class
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
}
const isMyTurn = (gameFromDB, actorId) => {
  const isPlayer1 = actorId === gameFromDB.p1
  const isPlayer2 = actorId === gameFromDB.p2
  return (
    (gameFromDB.isP1Turn && isPlayer1) || (!gameFromDB.isP1Turn && isPlayer2)
  )
}
const validateBoard = function(newBoard, oldGame, actorId) {
  //player may not make any changes when not their turn.

  //player cannot have more than 5 cards on the field.

  //player cannot
  const {player1: newPlayer1, player2: newPlayer2} = newBoard
  const {player1: oldPlayer1, player2: oldPlayer2} = oldGame.game

  if (!isMyTurn(oldGame, actorId)) {
    throw new Error('Invalid move! It is not your turn.')
  }
  if (newPlayer1.deck !== oldPlayer1.deck) {
    throw new Error('Invalid move! You cannot do that')
  }
}
const userOnly = (req, res, next) => {
  if (req.user) {
    next()
  } else {
    return res.status(401).send('You are not allowed to do that.')
  }
}
const adminOnly = (req, res, next) => {
  if (req.user.isAdmin) {
    next()
  } else {
    return res.status(401).send('Admin only.')
  }
}

module.exports = {
  relativizeBoard,
  objectifyBoard,
  isMyTurn,
  validateBoard,
  shuffleDeck,
  userOnly,
  adminOnly
}
