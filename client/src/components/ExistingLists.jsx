import { useSelector } from 'react-redux'

import List from './List'

const ExistingLists = () => {
  const lists = useSelector((state) => state.lists);
  
  return (
    <div id="existing-lists" className="existing-lists">
      {lists.map(list => <List key={list._id} list={list} />)}
    </div>
  );
}

export default ExistingLists;