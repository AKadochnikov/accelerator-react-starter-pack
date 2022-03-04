import {useEffect, useState} from 'react';
import {Guitar} from '../../types/types';

export const usePrice = (guitars: Guitar[], discount: number) => {
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const resultPrice = totalPrice-(totalPrice*discount);

  useEffect(() => {
    if(guitars.length > 0) {
      const price = guitars.map((item) => {
        if(item.count){
          return item.count * item.price;
        }
        return item.price;
      }).reduce((itemA, itemB) => itemA + itemB);
      setTotalPrice(price);
      return;
    }
    setTotalPrice(0);
  }, [guitars]);

  return {resultPrice, totalPrice};
};
