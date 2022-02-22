import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateListTitle } from '../actions/ListActions';

import Card from './Card';

const List = ({list}) => {
  const cards = useSelector(state => state.cards).filter(card => card.listId === list._id);
  const [isEditing, setIsEditing] = useState(false);
  const [listTitle, setListTitle] = useState(list.title);
  const dispatch = useDispatch();
  
  const handleTitleUpdate = (event) => {
    event.preventDefault();
    if (listTitle === list.title || listTitle === '') {
      setIsEditing(false);
      setListTitle(list.title);
    } else {
      dispatch(updateListTitle(list._id, listTitle, () => setIsEditing(false)));
    }
  };
  
  return (
    <div className="list-wrapper">
      <div className="list-background">
        <div className="list">
          <a className="more-icon sm-icon" href=""></a>
          <div>
            { isEditing ? (
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
              <p className="list-title" onClick={() => setIsEditing(true)}>{list.title}</p>
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
            {cards.map(card => <Card key={card._id} card={card}/>)}
          </div>
          <div className="add-dropdown add-bottom">
            <div className="card">
              <div className="card-info"></div>
              <textarea name="add-card"></textarea>
              <div className="members"></div>
            </div>
            <a className="button">Add</a>
            <i className="x-icon icon"></i>
            <div className="add-options">
              <span>...</span>
            </div>
          </div>
          <div className="add-card-toggle" data-position="bottom">
            Add a card...
          </div>
        </div>
      </div>
    </div>
  );
}

export default List;