import Review from '../review/review';
import {Comment} from '../../types/types';

type ReviewListProps = {
  comments: Comment[];
}

function ReviewList (props: ReviewListProps):JSX.Element {
  const {comments} = props;
  return (
    <>
      {comments.map((commentItem) => <Review key={commentItem.id} commentItem={commentItem}/>)}
    </>
  );
}

export default ReviewList;
