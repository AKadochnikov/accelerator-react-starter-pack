import {Comment} from '../../types/types';
import RatingTemplate from '../rating-template/rating-template';

type RatingProps = {
  rating: number;
  id: number;
  comments: Comment[];
}

function Rating (props: RatingProps): JSX.Element {
  const {rating, id, comments} = props;
  return (
    <>
      <RatingTemplate rating={rating} id={id}/>
      <span className="rate__count">{comments.length}</span><span className="rate__message"/>
    </>
  );
}

export default Rating;
