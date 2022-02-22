export const BOARDS_INDEX_URL = "/api/boards";
export const CREATE_BOARD_URL = "/api/boards";
export const CREATE_LIST_URL = "/api/lists";

export const boardIndexUrl = function(boardId) {
  return `/api/boards/${boardId}`;
};