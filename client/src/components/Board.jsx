import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as boardActions from "./../actions/BoardActions";
import * as listActions from "./../actions/ListActions";
import * as cardActions from "./../actions/CardActions";
import ExistingLists from "./ExistingLists";

const Board = ({ location }) => {
  const dispatch = useDispatch();
  const [addListSelected, setAddListSelected] = useState(false);
  const [newListTitle, setNewListTitle] = useState("");
  const inputRef = useRef(null);
  const showingCard = location.pathname.includes('cards');
  const boards = useSelector(state => state.boards);
  const cards = useSelector(state => state.cards);
  let card, board, cardId, boardId;

  if (showingCard) {
    cardId = useParams().id;
    card = cards.find(card => card._id === cardId);
    if (card) {
      boardId = card.boardId;
    }
  } else {
    boardId = useParams().id;
  }

  if (boardId) {
    board = boards.find(board => board._id === boardId);
  }

  useEffect(() => {
    if (boardId) {
      dispatch(boardActions.fetchBoardById(boardId));
    }
  }, [dispatch, boardId]);
  
  useEffect(() => {
    if (cardId) {
      dispatch(cardActions.fetchCardById(cardId));
    }
  }, [dispatch, cardId]);

  useEffect(() => {
    if (addListSelected) {
      inputRef.current.focus();
    }
  }, [addListSelected]);

  if (!board) { return null; }

  const openNewListForm = (event) => {
    event.preventDefault();
    setAddListSelected(true);
  };
  
  const closeNewListForm = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setAddListSelected(false);
    setNewListTitle("");
  };
  
  const handleNewListSubmit = (event) => {
    event.preventDefault();
    if (newListTitle === "") { return; }
    dispatch(listActions.createList(newListTitle, boardId, () => closeNewListForm(event)));
  };
  
  const newListClass = () => {
    return addListSelected ? 'new-list selected' : 'new-list';
  };

  return (
    <>
      <header>
        <ul>
          <li id="title">{board.title}</li>
          <li className="star-icon icon"></li>
          <li className="private private-icon icon">Private</li>
        </ul>
        <div className="menu">
          <i className="more-icon sm-icon"></i>Show Menu
        </div>
        <div className="subscribed">
          <i className="sub-icon sm-icon"></i>Subscribed
        </div>
      </header>
      <main>
        <div id="list-container" className="list-container">
          <ExistingLists />
          <div id="new-list" className={newListClass()} onClick={openNewListForm}>
            <span>Add a list...</span>
            <input
              type="text"
              placeholder="Add a list..."
              onChange={(e) => setNewListTitle(e.target.value)}
              value={newListTitle}
              ref={inputRef}
            />
            <div>
              <input
                type="submit"
                className="button"
                value="Save"
                onClick={handleNewListSubmit}
              />
              <i className="x-icon icon" onClick={closeNewListForm}></i>
            </div>
          </div>
        </div>
      </main>
      <div className="menu-sidebar">
        <div id="menu-main" className="main slide">
          <i className="back-icon icon"></i>
          <i className="x-icon icon"></i>
          <h1>Menu</h1>
          <div className="menu-contents">
            <div className="members">
              <div className="member-container">
                <div className="card-member ">VR</div>
              </div>
              <div className="member-container">
                <div className="card-member admin">TP</div>
              </div>
              <div className="member-container">
                <div className="card-member ">KW</div>
              </div>
            </div>
            <div className="add-members">
              <i className="add-icon sm-icon"></i>Add Members...
            </div>
            <hr />
            <ul className="menu-list">
              <li className="background-item">Change Background</li>
              <li className="filter-icon menu-icon">Filter Cards</li>
              <li className="power-icon menu-icon not-implemented">Power-Ups</li>
              <li className="stickers-icon menu-icon not-implemented">Stickers</li>
              <li className="more-icon menu-icon">More</li>
              <hr />
              <li className="activity-icon menu-icon not-implemented">Activity</li>
            </ul>
            <ul className="activity-list">
              <li>
                <i className="member-icon"></i>
                <p>
                  <span className="member-name">Taylor Peat</span> changed the
                  background of this board <small>yesterday at 4:53 PM</small>
                </p>
              </li>
              <li>
                <i className="member-icon"></i>
                <p>
                  <span className="member-name">Taylor Peat</span> sent{" "}
                  <span className="link">
                    Use the + in the top menu to make your first board now.
                  </span>{" "}
                  to the board <small>4 hours ago</small>
                </p>
              </li>
              <li>
                <i className="member-icon"></i>
                <p>
                  <span className="member-name">Taylor Peat</span> archived{" "}
                  <span className="link">
                    Use the + in the top menu to make your first board now.
                  </span>{" "}
                  <small>4 hours ago</small>
                </p>
              </li>
              <li>
                <i className="member-icon"></i>
                <p>
                  <span className="member-name">Taylor Peat</span> changed the
                  background of this board <small>5 hours ago</small>
                </p>
              </li>
              <li>
                <i className="member-icon"></i>
                <p>
                  <span className="member-name">Taylor Peat</span> changed the
                  background of this board <small>6 hours ago</small>
                </p>
              </li>
              <li>
                <i className="member-icon"></i>
                <p>
                  <span className="member-name">Taylor Peat</span> changed the
                  background of this board <small>yesterday at 10:23 PM</small>
                </p>
              </li>
            </ul>
            <a className="all-activity not-implemented">View all activity...</a>
          </div>
        </div>
      </div>
      <div id="dropdown-container"></div>
    </>
  );
};

export default Board;
