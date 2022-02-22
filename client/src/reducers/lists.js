import * as actions from "../constants/ActionTypes";

export default function lists(state = [], action) {
  switch (action.type) {
    case actions.FETCH_BOARD_SUCCESS: {
      const listsNoCards = action.board.lists.map(list => {
        const { cards, ...rest } = list;
        return rest;
      })
      return listsNoCards;
    }
    case actions.CREATE_LIST_SUCCESS: {
      return state.concat(action.list)
    }
    default:
      return state;
  }
}