import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateListTitle } from '../actions/ListActions';
import { createCard } from '../actions/CardActions';

import Card from './Card';

const List = ({list, isAddingCard, toggleAddingCard}) => {
  const cards = useSelector(state => state.cards).filter(card => card.listId === list._id);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [listTitle, setListTitle] = useState(list.title);
  const [newCardInfo, setNewCardInfo] = useState("");
  const addCardRef = useRef(null);
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (isAddingCard) {
      addCardRef.current.focus();
    }
  }, [isAddingCard]);

  const handleTitleUpdate = (event) => {
    event.preventDefault();
    if (listTitle === list.title || listTitle === '') {
      setIsEditingTitle(false);
      setListTitle(list.title);
    } else {
      dispatch(updateListTitle(list._id, listTitle, () => setIsEditingTitle(false)));
    }
  };
  
  const openAddCard = (event) => {
    event.preventDefault();
    toggleAddingCard();
  };

  const closeAddCard = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setNewCardInfo("");
    toggleAddingCard();
  };
  
  const handleAddCardSubmit = (event) => {
    event.preventDefault();
    if (newCardInfo === "") { return; }
    dispatch(createCard(list._id, newCardInfo, () => closeAddCard(event)));
  };
  
  return (
    <div className={isAddingCard ? "list-wrapper add-dropdown-active" : "list-wrapper"} >
      <div className="list-background">
        <div className="list">
          <a className="more-icon sm-icon" href=""></a>
          <div>
            { isEditingTitle ? (
              <input
                type="text"
                className="list-title"
                value={listTitle}
                onChange={(e) => setListTitle(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") handleTitleUpdate(e) } }
                onBlur={handleTitleUpdate}
                autoFocus={true}
              />
            ) : (
              <p className="list-title" onClick={() => setIsEditingTitle(true)}>{list.title}</p>
            )}
          </div>
          <div className="add-dropdown add-top">
            <div className="card"></div>
            <a className="button">Add</a>
            <i className="x-icon icon"></i>
            <div className="add-options">
              <span>...</span>
            </div>
          </div>
          <div id="cards-container" data-id="list-1-cards">
            {cards.map(card => (
              <Link key={card._id} to={`/cards/${card._id}`}>
                <Card card={card}/>
              </Link>
            ))}
          </div>
          <div className={isAddingCard ? "add-dropdown add-bottom active-card" : "add-dropdown add-bottom"} > 
            <div className="card">
              <div className="card-info"></div>
              <textarea
                name="add-card"
                ref={addCardRef}
                onChange={(e) => setNewCardInfo(e.target.value)}
                value={newCardInfo}>
              </textarea>
              <div className="members"></div>
            </div>
            <a className="button" onClick={handleAddCardSubmit}>Add</a>
            <i className="x-icon icon" onClick={closeAddCard}></i>
            <div className="add-options">
              <span>...</span>
            </div>
          </div>
          <div className="add-card-toggle" data-position="bottom" onClick={openAddCard}>
            Add a card...
          </div>
        </div>
      </div>
    </div>
  );
}

export default List;