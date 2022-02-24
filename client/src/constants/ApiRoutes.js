export const BOARDS_INDEX_URL = "/api/boards";
export const CREATE_BOARD_URL = "/api/boards";
export const CREATE_LIST_URL = "/api/lists";
export const CREATE_CARD_URL = "/api/cards";

export const updateListUrl = function(listId) {
  return `/api/lists/${listId}`;
};

export const boardIndexUrl = function(boardId) {
  return `/api/boards/${boardId}`;
};

export const cardIndexUrl = function(cardId) {
  return `/api/cards/${cardId}`;
};