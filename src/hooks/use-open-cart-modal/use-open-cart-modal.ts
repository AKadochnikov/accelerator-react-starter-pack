import {useState} from 'react';
import {MouseEvent} from 'react';

export const useOpenCartModal = () => {
  const [isOpenedCartModal, setIsOpenedCartModal] = useState<boolean>(false);

  const handleOpenCartModal = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    document.body.style.overflow = 'hidden';
    setIsOpenedCartModal(true);
  };

  return {handleOpenCartModal, isOpenedCartModal, setIsOpenedCartModal};
};
