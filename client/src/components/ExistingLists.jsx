import { useState } from 'react'
import { useSelector } from 'react-redux'

import List from './List'

const ExistingLists = () => {
  const lists = useSelector((state) => state.lists);
  const [listAddingCardId, setListAddingCardId] = useState('');
  
  return (
    <div id="existing-lists" className="existing-lists">
      {lists.map(list => (
        <List 
          key={list._id}
          list={list}
          isAddingCard={list._id === listAddingCardId}
          toggleAddingCard={() => listAddingCardId === list._id ? setListAddingCardId('') : setListAddingCardId(list._id)}
        />
      ))}
    </div>
  );
};

export default ExistingLists;