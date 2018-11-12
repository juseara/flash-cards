import { FETCH_DECKS, SET_DECK, DELETE_DECK } from '../actions/types'

function decks(state = {}, action) {
  switch (action.type) {
    case SET_DECK: {
      const newState = {
        ...state,
        [action.payload.name]: action.payload
      }
      return newState
    }
    case DELETE_DECK:{
      console.log("OLDSTATE",state)
      const newState = {...state}
      delete newState[action.payload]
      console.log("NEW STATE", newState)
      return newState
    }
    case FETCH_DECKS: {
        return action.payload
      }
    default:
      return state
  }
}

export default decks