import * as actions from "../constants/ActionTypes";

export default function cards(state = [], action) {
  switch (action.type) {
    case actions.FETCH_BOARD_SUCCESS: {
      let cardCollection = [];
      action.board.lists.forEach(list => {
        const cards = list.cards.filter(c => !state.find(stateCard => stateCard._id === c._id))
        cardCollection.push(...cards);
      })

      return state.concat(cardCollection);
    }
    case actions.CREATE_CARD_SUCCESS: {
      return state.concat(action.card);
    }
    case actions.FETCH_CARD_SUCCESS: {
      let found = false;
      let newCards = state.map(card => {
        if (card._id === action.card._id) {
          found = true;
          return action.card;
        } else {
          return card;
        }
      })

      if (!found) {
        newCards.push(action.card)
      }
      
      return newCards;
    }
    default:
      return state;
  }
}