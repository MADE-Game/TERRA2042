import axios from 'axios'
import history from '../../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const ALL_COLLECTIONS_FOR_USER = 'ALL_COLLECTIONS_FOR_USER'
const GET_COLLECTION = 'GET_COLLECTION'
const CREATE_DECK = 'CREATE_DECK'
const EDIT_COLLECTION = 'EDIT_COLLECTION'
const SELECT_DECK = 'SELECT_DECK'
const REMOVE_COLLECTION = 'REMOVE_COLLECTION'
const ADD_TO_USER_CARDS = 'ADD_TO_USER_CARDS'
const GET_CARDS_IN_SHOP = 'GET_CARDS_IN_SHOP'

/**
 * INITIAL STATE
 */
const initialState = {
  collections: [],
  selectedCollection: {
    cards: [],
    name: '',
    _id: ''
  },
  defaultUser: {},
  selectedDeck: {},
  inShop: []
}
/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})

const gotAllCollections = collections => ({
  type: ALL_COLLECTIONS_FOR_USER,
  collections
})

const gotCollection = collection => ({
  type: GET_COLLECTION,
  collection
})

const createdDeck = deck => ({
  type: CREATE_DECK,
  deck
})

const editedCollection = collection => ({
  type: EDIT_COLLECTION,
  collection
})

const selectedDeck = deck => ({
  type: SELECT_DECK,
  deck
})

const removedCollection = collectionId => ({
  type: REMOVE_COLLECTION,
  collectionId
})

const addedToUserCards = (userCards, cardCost) => ({
  type: ADD_TO_USER_CARDS,
  userCards,
  cardCost
})

const gotCardsInShop = cards => ({
  type: GET_CARDS_IN_SHOP,
  cards
})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || initialState.defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method, userName) => async dispatch => {
  let res
  try {
    const collections = []
    res = await axios.post(`/auth/${method}`, {
      email,
      password,
      userName,
      collections
    })
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }
  try {
    dispatch(getUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const getAllUserCollections = userId => {
  return async dispatch => {
    const {data: collections} = await axios.get(
      `/api/users/${userId}/collections`
    )

    dispatch(gotAllCollections(collections))
  }
}
export const selectDeck = name => {
  return async dispatch => {
    const {data: deck} = await axios.put('/api/users/collections/selected', {
      name
    })
    dispatch(selectedDeck(deck))
  }
}

export const getCollection = collectionId => async dispatch => {
  const {data: collection} = await axios.get(`/api/collections/${collectionId}`)
  dispatch(gotCollection(collection))
}

export const getCardsInShop = () => async dispatch => {
  const {data: cards} = await axios.get('/api/cards/?inShop=true')
  dispatch(gotCardsInShop(cards))
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

export const addToCollection = (collection, cardId) => {
  return async dispatch => {
    try {
      const fullCollection = {
        ...collection,
        cards: [...collection.cards, cardId]
      }

      const {data: newCollection} = await axios.put(
        '/api/collections/' + collection._id,
        fullCollection
      )

      dispatch(editedCollection(newCollection))
    } catch (e) {
      console.error(e)
    }
  }
}

export const removeFromCollection = (collection, cardId) => {
  return async dispatch => {
    try {
      const fullCollection = {
        ...collection,
        cards: collection.cards.filter(card => card._id !== cardId)
      }

      const {data: newCollection} = await axios.put(
        '/api/collections/' + collection._id,
        fullCollection
      )

      dispatch(editedCollection(newCollection))
    } catch (e) {
      console.error(e)
    }
  }
}

export const createDeck = name => async dispatch => {
  try {
    const deck = await axios.post('/api/collections', {name})
    deck.status === 206
      ? // eslint-disable-next-line no-alert
        alert(`${deck.data} already exists!`)
      : dispatch(createdDeck(deck.data))
  } catch (error) {
    console.error(error)
  }
}

export const removeCollection = collectionId => async dispatch => {
  try {
    await axios.delete(`/api/collections/${collectionId}`)
    dispatch(removedCollection(collectionId))
  } catch (error) {
    console.error(error)
  }
}

export const addToUserCards = (cards, cardCost) => async dispatch => {
  try {
    const {data: userCards} = await axios.put(
      '/api/collections/user/userCards',
      {
        cards,
        cardCost
      }
    )
    dispatch(addedToUserCards(userCards, cardCost))
  } catch (error) {
    console.error(error)
  }
}

/**
 * REDUCER
 */
// eslint-disable-next-line complexity
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return {...state, ...action.user}
    case REMOVE_USER:
      return initialState
    case EDIT_COLLECTION:
      return {
        ...state,
        collections: state.collections.map(coll =>
          coll._id === action.collection._id ? action.collection : coll
        ),
        selectedCollection:
          state.selectedCollection._id === action.collection._id
            ? action.collection
            : state.selectedCollection
      }
    case ALL_COLLECTIONS_FOR_USER:
      return {...state, collections: action.collections}
    case GET_COLLECTION:
      return {...state, selectedCollection: action.collection}
    case GET_CARDS_IN_SHOP:
      return {...state, inShop: action.cards}
    case REMOVE_COLLECTION:
      return {
        ...state,
        collections: state.collections.filter(
          coll => coll._id !== action.collectionId
        )
      }
    case ADD_TO_USER_CARDS:
      return {
        ...state,
        collections: state.collections.map(coll =>
          coll.isDeck ? coll : action.userCards
        ),
        gold: state.gold - action.cardCost
      }
    case SELECT_DECK:
      return {...state, selectedDeck: action.deck._id}
    case CREATE_DECK:
      return {...state, collections: [...state.collections, action.deck]}
    default:
      return state
  }
}
