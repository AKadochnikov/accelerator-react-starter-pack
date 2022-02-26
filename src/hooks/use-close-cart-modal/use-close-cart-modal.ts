import {Dispatch, SetStateAction, MouseEvent} from 'react';
import {Key} from '../../const';

export const useCloseCartModal = (cb: Dispatch<SetStateAction<boolean>>) => {

  const handleKeyDown = (evt: KeyboardEvent) => {
    if(evt.key === Key.Escape || evt.key === Key.Esc) {
      document.body.style.overflow = 'scroll';
      cb(false);
      document.body.removeEventListener('keydown', handleKeyDown);
    }
  };

  const handleCloseClick = (evt: MouseEvent<HTMLAnchorElement | HTMLDivElement | HTMLButtonElement>) => {
    evt.preventDefault();
    document.body.style.overflow = 'scroll';
    cb(false);
    document.body.removeEventListener('keydown', handleKeyDown);
  };

  return {handleKeyDown, handleCloseClick};
};
