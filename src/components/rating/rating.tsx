import {comment} from '../../types/types';

type RatingProps = {
  rating: number;
  id: number;
  comments: comment[];
}

function Rating (props: RatingProps): JSX.Element {
  const {rating, id, comments} = props;
  const newRating = new Array(5).fill(null).fill('full', 0, rating);
  return (
    <>
      <span className="visually-hidden">Рейтинг:</span>
      {newRating.map((item, index) => {
        if (!item) {
          return (
            <svg key={`${index + id}`} width="12" height="11" aria-hidden="true">
              <use xlinkHref="#icon-star"/>
            </svg>
          );
        }
        return (
          <svg key={`${index + id}`} width="12" height="11" aria-hidden="true">
            <use xlinkHref="#icon-full-star"/>
          </svg>
        );
      })}
      <span className="rate__count">{comments.length}</span><span className="rate__message"/>
    </>
  );
}

export default Rating;
