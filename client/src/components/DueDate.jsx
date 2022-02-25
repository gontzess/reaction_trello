const DueDate = ({dateString}) => {
  const dd = new Date(dateString);
  const overdue = Date.now() > dd.valueOf();
  
  return (
  <li className="due-date-section">
    <h3>Due Date</h3>
    <div id="dueDateDisplay" className="overdue completed">
      <input
        id="dueDateCheckbox"
        type="checkbox"
        className="checkbox"
        checked=""
      />
      { dd.toDateString() }
      <span>{overdue ? " (past due)" : "" }</span>
    </div>
  </li>
  )
};

export default DueDate;