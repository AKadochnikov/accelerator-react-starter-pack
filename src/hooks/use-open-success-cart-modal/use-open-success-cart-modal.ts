import {useState} from 'react';

export const useOpenSuccessCartModal = () => {
  const [isOpenedSuccessCartModal, setIsOpenedSuccessCartModal] = useState(false);

  return {isOpenedSuccessCartModal, setIsOpenedSuccessCartModal};
};
