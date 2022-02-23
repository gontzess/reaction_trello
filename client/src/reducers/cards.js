import * as actions from "../constants/ActionTypes";

export default function cards(state = [], action) {
  switch (action.type) {
    case actions.FETCH_BOARD_SUCCESS: {
      let cardCollection = [];
      action.board.lists.forEach(list => {
        const { cards } = list;
        cardCollection.push(...cards);
      })
      return cardCollection;
    }
    case actions.CREATE_CARD_SUCCESS: {
      return state.concat(action.card);
    }
    default:
      return state;
  }
}