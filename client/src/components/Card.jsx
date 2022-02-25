const Card = ({card}) => {
  return (
    <div className="card-background">
      <div className="card ">
        <i className="edit-toggle edit-icon sm-icon"></i>
        <div className="card-info">
          <div className="card-label green colorblindable"></div>
          <p>{card.title}</p>
        </div>
        { card.dueDate && (
          <div className="card-icons">
            <i className="clock-icon sm-icon overdue-recent completed">
            {(new Date(card.dueDate).toDateString()) }
            </i>
            <i className="description-icon sm-icon"></i>
            <i className="comment-icon sm-icon"></i>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;