import { SET_DECK, FETCH_DECKS } from '../actions/types'
import  { fetchDecks, saveDeck } from '../utils/helper'

export function getDecks (decks) {
  return {
    type: FETCH_DECKS,
    payload: decks
  }
}

export function setDeck (deck){
    return {
        type: SET_DECK,
        payload: deck
    }
}
