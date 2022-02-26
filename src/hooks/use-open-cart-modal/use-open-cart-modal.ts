import {useState} from 'react';
import {MouseEvent} from 'react';

export const useOpenCartModal = () => {
  const [isOpenedCartModal, setIsOpenedCartModal] = useState<boolean>(false);

  const handleOpenCartModal = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    setIsOpenedCartModal(!isOpenedCartModal);
  };

  return {handleOpenCartModal, isOpenedCartModal, setIsOpenedCartModal};
};
