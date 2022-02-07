import {Comment} from '../../types/types';
import RatingTemplate from '../rating-template/rating-template';
import {humanizeDate} from '../../utils';

type ReviewProps = {
  commentItem: Comment;
}

function Review (props: ReviewProps): JSX.Element {
  const {commentItem} = props;
  const {userName, rating, comment, createAt, disadvantage, advantage, id} = commentItem;
  const currentDate = new Date(createAt);
  const humanizedDate = humanizeDate(currentDate);

  return (
    <div className="review">
      <div className="review__wrapper">
        <h4 className="review__title review__title--author title title--lesser">{userName}</h4>
        <span className="review__date">{humanizedDate}</span>
      </div>
      <div className="rate review__rating-panel" aria-hidden="true">
        <RatingTemplate rating={rating} id={id}/>
        <span className="rate__count"/><span className="rate__message"/>
      </div>
      <h4 className="review__title title title--lesser">Достоинства:</h4>
      <p className="review__value">{advantage}</p>
      <h4 className="review__title title title--lesser">Недостатки:</h4>
      <p className="review__value">{disadvantage}</p>
      <h4 className="review__title title title--lesser">Комментарий:</h4>
      <p className="review__value">{comment}
      </p>
    </div>
  );
}

export default Review;
