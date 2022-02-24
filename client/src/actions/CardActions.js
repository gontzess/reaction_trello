import apiClient from "../lib/ApiClient";
import * as types from "../constants/ActionTypes";

export function createCardSuccess(card) {
  return { type: types.CREATE_CARD_SUCCESS, card: card };
}

export function fetchCardSuccess(card) {
  return { type: types.FETCH_CARD_SUCCESS, card: card }
}

export function createCard(listId, title, cleanup) {
  return function(dispatch) {
    apiClient.createCard(listId, title, (data) => {
      dispatch(createCardSuccess(data));

      if (cleanup) {
        cleanup();
      }
    });
  };
}

export function fetchCardById(cardId, cleanup) {
  return function(dispatch) {
    apiClient.getCardById(cardId, (data) => {
      dispatch(fetchCardSuccess(data));

      if (cleanup) {
        cleanup();
      }
    });
  };
}