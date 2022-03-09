import Review from '../review/review';
import {Comment} from '../../types/types';
import {useInView} from 'react-intersection-observer';
import {useEffect, useState} from 'react';
import {COMMENT_STEP, WAIT_500_MILLISECONDS} from '../../const';
import {getActiveComments} from '../../utils';
import {MouseEvent} from 'react';

type ReviewListProps = {
  comments: Comment[];
}

function ReviewList (props: ReviewListProps):JSX.Element {
  const {comments} = props;
  const [activeComments, setActiveComments] = useState<Comment[]>(comments);
  const [ref, inView] = useInView({
    delay: WAIT_500_MILLISECONDS,
  });
  const [view, setView] = useState(inView);
  const [prevComments, setPrevComments] = useState(comments);

  const handleShowComment = () => {
    if(activeComments.length < comments.length) {
      const newCountValue = activeComments.length + COMMENT_STEP;
      getActiveComments(newCountValue, comments, setActiveComments);
    }
  };

  const handleClickButtonUP = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    setView(inView);
  }, [inView]);

  useEffect(() => {
    if (view) {
      if(activeComments.length < comments.length) {
        const newCountValue = activeComments.length + COMMENT_STEP;
        setView(false);
        setPrevComments(comments);
        getActiveComments(newCountValue, comments, setActiveComments);
      }
      return;
    }
    if (comments !== prevComments) {
      if(activeComments.length < comments.length) {
        const newCountValue = activeComments.length + COMMENT_STEP;
        setView(false);
        setPrevComments(comments);
        getActiveComments(newCountValue, comments, setActiveComments);
      }
    }
  },[activeComments.length, comments, prevComments, view]);

  return (
    <>
      {activeComments.map((commentItem) => <Review key={commentItem.id} commentItem={commentItem}/>)}
      {activeComments.length < comments.length? <button onClick={handleShowComment} ref={ref} className="button button--medium reviews__more-button">Показать еще отзывы</button>  : ''}
      {comments.length !== 0? <a onClick={handleClickButtonUP} className="button button--up button--red-border button--big reviews__up-button" href="#header">Наверх</a> : ''}
    </>
  );
}

export default ReviewList;
