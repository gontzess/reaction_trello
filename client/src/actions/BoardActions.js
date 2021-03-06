import apiClient from "../lib/ApiClient";
import * as types from "../constants/ActionTypes";

// export function fetchBoardsRequest() {
//   return { type: types.FETCH_BOARDS_REQUEST };
// }

export function fetchBoardsSuccess(boards) {
  return { type: types.FETCH_BOARDS_SUCCESS, boards };
}

export function fetchBoardSuccess(board) {
  return { type: types.FETCH_BOARD_SUCCESS, board };
}

// export function createBoardRequest() {
//   return { type: types.CREATE_BOARD_REQUEST };
// }

export function createBoardSuccess(board) {
  return { type: types.CREATE_BOARD_SUCCESS, board: board };
}

export function fetchBoards() {
  return function(dispatch) {
    apiClient.getBoards(data => dispatch(fetchBoardsSuccess(data.boards)));
  };
}

export function fetchBoardById(boardId) {
  return function(dispatch) {
    apiClient.getBoardById(boardId, data => {
      dispatch(fetchBoardSuccess(data.board))
    });
  };
}

export function createBoard(board, cleanup) {
  return function(dispatch) {
    apiClient.createBoard(board, (data) => {
      dispatch(createBoardSuccess(data.board));

      if (cleanup) {
        cleanup(data.board);
      }
    });
  };
}
