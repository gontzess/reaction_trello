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
      
    default:
      return state;
  }
}