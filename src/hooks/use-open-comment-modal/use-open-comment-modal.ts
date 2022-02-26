import {MouseEvent, useState} from 'react';

export const useOpenCommentModal = () => {
  const [isOpenedCommentModal, setIsOpenedCommentModal] = useState<boolean>(false);
  const handleOpenCommentModal = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    document.body.style.overflow = 'hidden';
    setIsOpenedCommentModal(!isOpenedCommentModal);
  };
  return {isOpenedCommentModal, setIsOpenedCommentModal, handleOpenCommentModal};
};
