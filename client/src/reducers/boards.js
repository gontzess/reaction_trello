import * as actions from "../constants/ActionTypes";

export default function boards(state = [], action) {
  switch (action.type) {
    case actions.FETCH_BOARDS_SUCCESS: {
      return action.boards;
    }
    case actions.CREATE_BOARD_SUCCESS: {
      const newBoard = action.board;
      return state.concat(newBoard);
    }
    case actions.FETCH_BOARD_SUCCESS: {
      const board = action.board;
      return [board]; // THIS IS WRONG
    }
    default:
      return state;
  }
}
