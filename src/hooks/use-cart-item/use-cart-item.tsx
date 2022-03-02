import {FormEvent, useState, Dispatch, SetStateAction} from 'react';
import {MIN_CART_VALUE} from '../../const';
import {useDispatch, useSelector} from 'react-redux';
import {getAddedGuitars} from '../../store/data/selectors';
import {adaptImgPath, debouncedUpdateCount, getRussianType, updateCount} from '../../utils';

export const useCartItem = (id: number, previewImg: string, type: string, price: number, setIsOpenedModal: Dispatch<SetStateAction<boolean>>) => {
  const [currentCount, setCurrentCount] = useState<number>(MIN_CART_VALUE);
  const dispatch = useDispatch();
  const addedGuitars = useSelector(getAddedGuitars);

  const handleInputCount = (evt: FormEvent<HTMLInputElement>) => {
    const value = Number(evt.currentTarget.value);
    if (value === 0) {
      setIsOpenedModal(true);
      return;
    }
    setCurrentCount(value);
    void debouncedUpdateCount(value, dispatch, addedGuitars, id, setCurrentCount);
  };

  const handleIncrementCount = () => {
    const value = currentCount + MIN_CART_VALUE;
    setCurrentCount(value);
    updateCount(value, dispatch, addedGuitars, id, setCurrentCount);
  };

  const handleDecrementCount = () => {
    const value = currentCount - MIN_CART_VALUE;
    if (value === 0) {
      setIsOpenedModal(true);
      return;
    }
    setCurrentCount(value);
    updateCount(value, dispatch, addedGuitars, id, setCurrentCount);
  };

  const imagePath = adaptImgPath(previewImg);
  const russianType = getRussianType(type);
  const totalPrice = currentCount * price;

  return {currentCount, setCurrentCount, handleInputCount, handleIncrementCount, handleDecrementCount, imagePath, russianType, totalPrice};
};
