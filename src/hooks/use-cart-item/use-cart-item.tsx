import {FormEvent, useState, Dispatch, SetStateAction} from 'react';
import {MIN_CART_VALUE} from '../../const';
import {useDispatch, useSelector} from 'react-redux';
import {getAddedGuitars} from '../../store/data/selectors';
import {adaptImgPath, getRussianType, updateCount} from '../../utils';

export const useCartItem = (id: number, previewImg: string, type: string, price: number, setIsOpenedModal: Dispatch<SetStateAction<boolean>>) => {
  const [currentCount, setCurrentCount] = useState<number | ''>(MIN_CART_VALUE);
  const dispatch = useDispatch();
  const addedGuitars = useSelector(getAddedGuitars);

  const handleFocusCount = () => {
    updateCount(currentCount, dispatch, addedGuitars, id, setCurrentCount, setIsOpenedModal);
  };

  const handleInputCount = (evt: FormEvent<HTMLInputElement>) => {
    if(evt.currentTarget.value === '') {
      setCurrentCount('');
      return;
    }
    const value = Number(evt.currentTarget.value);
    setCurrentCount(value);
  };

  const handleIncrementCount = () => {
    const value = Number(currentCount) + MIN_CART_VALUE;
    setCurrentCount(value);
    updateCount(value, dispatch, addedGuitars, id, setCurrentCount, setIsOpenedModal);
  };

  const handleDecrementCount = () => {
    const value = Number(currentCount) - MIN_CART_VALUE;
    if (value === 0) {
      setIsOpenedModal(true);
      return;
    }
    setCurrentCount(value);
    updateCount(value, dispatch, addedGuitars, id, setCurrentCount, setIsOpenedModal);
  };

  const imagePath = adaptImgPath(previewImg);
  const russianType = getRussianType(type);
  const totalPrice = Number(currentCount) * price;

  return {currentCount, setCurrentCount, handleInputCount, handleIncrementCount, handleDecrementCount, imagePath, russianType, totalPrice, handleFocusCount};
};
