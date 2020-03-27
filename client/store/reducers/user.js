import axios from 'axios'
import history from '../../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const ALL_COLLECTIONS_FOR_USER = 'ALL_COLLECTIONS_FOR_USER'
const ALL_CARDS_IN_COLLECTION = 'ALL_CARDS_IN_COLLECTION'
const CREATE_DECK = 'CREATE_DECK'

/**
 * INITIAL STATE
 */
const initialState = {
  collections: [],
  selectedCollection: [],
  defaultUser: {}
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
  type: ALL_CARDS_IN_COLLECTION,
  collection
})

const createdDeck = deck => ({
  type: CREATE_DECK,
  deck
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

export const getCollectionCards = collectionId => {
  return async dispatch => {
    const {data: collections} = await axios.get(
      `/api/collections/${collectionId}/cards`
    )
    const collection = collections
    dispatch(gotCollection(collection))
  }
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

export const createDeck = name => async dispatch => {
  try {
    const {data: deck} = await axios.post('/api/collections', {name})
    dispatch(createdDeck(deck))
  } catch (error) {
    console.error(error)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return {...state, ...action.user}
    case REMOVE_USER:
      return initialState
    case ALL_COLLECTIONS_FOR_USER:
      return {...state, collections: action.collections}
    case ALL_CARDS_IN_COLLECTION:
      return {...state, selectedCollection: action.collection}
    case CREATE_DECK:
      return {...state, collections: [...state.collections, action.deck]}
    default:
      return state
  }
}
