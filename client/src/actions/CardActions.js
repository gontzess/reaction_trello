import apiClient from "../lib/ApiClient";
import * as types from "../constants/ActionTypes";

export function createCardSuccess(card) {
  return { type: types.CREATE_CARD_SUCCESS, card: card };
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

// export function updateListTitle(listId, title, cleanup) {
//   return function(dispatch) {
//     apiClient.updateList(listId, {title}, (data) => {
//       dispatch(updateListSuccess(data));

//       if (cleanup) {
//         cleanup();
//       }
//     });
//   };
// }