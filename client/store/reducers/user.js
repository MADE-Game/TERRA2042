import axios from 'axios'
import history from '../../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const ALL_COLLECTIONS_FOR_USER = 'ALL_COLLECTIONS_FOR_USER'
const ALL_CARDS_IN_COLLECTION = 'ALL_CARDS_IN_COLLECTION'

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
const gotCollection = cards => ({
  type: ALL_CARDS_IN_COLLECTION,
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
  console.log(
    'logging email',
    email,
    'logging password',
    password,
    'logging username',
    userName,
    'logging method',
    method
  )
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

export const getAllUserCollections = id => {
  return async dispatch => {
    const {data: collections} = await axios.get(`/api/collections/${id}`)

    let theCollections = collections.map(function(collection) {
      return {...collection.cards}
    })
    dispatch(gotAllCollections(theCollections))
  }
}

export const getCollectionCards = () => {
  return async dispatch => {
    const {data: collections} = await axios.get('/api/collections/')
    const collection = collections[0]
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
      return {...state, selectedCollection: action.cards}
    default:
      return state
  }
}
