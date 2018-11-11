import { FETCH_DECKS, SET_DECK } from '../actions/types'

function decks(state = {}, action) {
  switch (action.type) {
    case SET_DECK: {
      const newState = {
        ...state,
        [action.payload.name]: action.payload
      }
      return newState
    }
    case FETCH_DECKS: {
      console.log("REDUCERS")
        return action.payload
      }
    default:
      return state
  }
}

export default decks