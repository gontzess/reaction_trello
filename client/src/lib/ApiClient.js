import axios from "axios";
import * as routes from "../constants/ApiRoutes";

function logError(errorResponse) {
  const response = errorResponse.response;

  if (response && response.data && response.data.error) {
    console.error(`HTTP Error: ${response.data.error}`);
  } else {
    console.error("Error: ", errorResponse);
  }
}

function unwrapData(response) {
  return response.data;
}

axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.headers.common["Accept"] = "application/json";

const apiClient = {
  getBoards: function(callback) {
    return axios
      .get(routes.BOARDS_INDEX_URL)
      .then(unwrapData)
      .then(callback)
      .catch(logError);
  },
  getBoardById: function(boardId, callback) {
    return axios
      .get(routes.boardIndexUrl(boardId))
      .then(unwrapData)
      .then(callback)
      .catch(logError);
  },
  createBoard: function(board, callback) {
    return axios
      .post(routes.CREATE_BOARD_URL, {board})
      .then(unwrapData)
      .then(callback)
      .catch(logError);
  },
  createList: function(title, boardId, callback) {
    return axios
      .post(routes.CREATE_LIST_URL, {boardId, list: { title }})
      .then(unwrapData)
      .then(callback)
      .catch(logError);
  },
  updateList: function(listId, updates, callback) {
    return axios
      .put(routes.updateListUrl(listId), updates)
      .then(unwrapData)
      .then(callback)
      .catch(logError);
  },
  createCard: function(listId, title, callback) {
    return axios
      .post(routes.CREATE_CARD_URL, {listId, card: { title }})
      .then(unwrapData)
      .then(callback)
      .catch(logError);
  },
  getCardById: function(cardId, callback) {
    return axios
      .get(routes.cardIndexUrl(cardId))
      .then(unwrapData)
      .then(callback)
      .catch(logError);
  },
};

export default apiClient;
