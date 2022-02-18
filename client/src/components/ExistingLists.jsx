import List from './List'

const ExistingLists = () => {
  return (
    <div id="list-container" className="list-container">
      <div id="existing-lists" className="existing-lists">
        <div className="list-wrapper">
          <List />
        </div>
      </div>
    </div>
  );
}

export default ExistingLists;