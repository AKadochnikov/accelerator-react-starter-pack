import Review from '../review/review';
import {Comment} from '../../types/types';
import {useInView} from 'react-intersection-observer';
import {useEffect, useState} from 'react';
import {COMMENT_STEP} from '../../const';
import {getActiveComments} from '../../utils';
import {MouseEvent} from 'react';

type ReviewListProps = {
  comments: Comment[];
}

function ReviewList (props: ReviewListProps):JSX.Element {
  const {comments} = props;
  const [activeComments, setActiveComments] = useState<Comment[]>(comments);
  const [commentsCount, setCommentsCount] = useState(3);
  const [ref, inView] = useInView({
    delay: 500,
  });

  const handleShowComment = () => {
    if(commentsCount < comments.length) {
      const newCountValue = commentsCount + COMMENT_STEP;
      setCommentsCount(newCountValue);
    }
  };

  const handleClickButtonUP = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if(inView && commentsCount < comments.length) {
      const newCountValue = commentsCount + COMMENT_STEP;
      setCommentsCount(newCountValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[inView]);

  useEffect(() => {
    getActiveComments(commentsCount, comments, setActiveComments);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commentsCount, comments]);

  return (
    <>
      {activeComments.map((commentItem) => <Review key={commentItem.id} commentItem={commentItem}/>)}
      {commentsCount < comments.length? <button onClick={handleShowComment} ref={ref} className="button button--medium reviews__more-button">Показать еще отзывы</button>  : ''}
      {comments.length !== 0? <a onClick={handleClickButtonUP} className="button button--up button--red-border button--big reviews__up-button" href="#header">Наверх</a> : ''}
    </>
  );
}

export default ReviewList;
