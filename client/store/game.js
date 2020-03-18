const PLAY_CARD = 'PLAY_CARD'
const DRAW_CARD = 'DRAW_CARD'

const playedCard = card => ({
  type: PLAY_CARD,
  card
})

const drewCard = (
  card = {
    name: 'Test',
    imageUrl: 'favicon.ico',
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

export const drawCard = () => {
  return dispatch => {
    dispatch(drewCard())
  }
}
const dummyProps = {
  name: 'Test',
  imageUrl: 'favicon.ico',
  attack: 1,
  defense: 4,
  id: 1
}
const dummyProps2 = {
  name: 'Test',
  imageUrl: 'favicon.ico',
  attack: 1,
  defense: 4,
  id: 2
}
const dummyProps3 = {
  name: 'Test',
  imageUrl: 'favicon.ico',
  attack: 1,
  defense: 4,
  id: 3
}
const dummyProps4 = {
  name: 'Test',
  imageUrl: 'favicon.ico',
  attack: 1,
  defense: 4,
  id: 4
}

const defaultGame = {
  player1: {
    inPlay: [],
    hand: [dummyProps, dummyProps2, dummyProps3, dummyProps4]
  },
  player2: {
    inPlay: [],
    hand: []
  }
}

export default function(state = defaultGame, action) {
  switch (action.type) {
    case PLAY_CARD:
      return {
        ...state,
        player1: {
          ...state.player1,
          inPlay: [...state.player1.inPlay, action.card],
          hand: state.player1.hand.filter(function(card) {
            return card.id !== action.card.id
          })
        }
      }
    case DRAW_CARD:
      return {
        ...state,
        player1: {...state.player1, hand: [...state.player1.hand, action.card]}
      }
    default:
      return state
  }
}
