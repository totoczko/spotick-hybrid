import { AUTH_SET_TOKEN, AUTH_REMOVE_TOKEN } from '../actions/actionTypes'

const initialState = {
  token: null,
  expiryDate: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_SET_TOKEN:
      return {
        ...state,
        token: action.token,
        expiryDate: action.expiryDate,
        color: action.color,
        username: action.username,
        email: action.email,
        id: action.id
      }
    case AUTH_REMOVE_TOKEN:
      return {
        ...state,
        token: null,
        expiryDate: null,
        color: null,
        username: null,
        email: null,
        id: null
      }
    default:
      return state
  }
}

export default reducer