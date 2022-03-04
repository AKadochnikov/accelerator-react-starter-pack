import {useState, FormEvent, useEffect} from 'react';
import {useGetCouponMutation} from '../../services/coupon-api/coupon-api';
import {MouseEvent} from 'react';
import {toast} from 'react-toastify';
import {FAIL_VALIDITY} from '../../const';

export const useCoupon = () => {
  const [coupon, setCoupon] = useState<string>('');
  const [getCoupon, {data, isLoading, isError, isSuccess}] = useGetCouponMutation();
  const [discount, setDiscount] = useState(0);

  const handleInput = (evt: FormEvent<HTMLInputElement>) => {
    const value = evt.currentTarget.value;
    setCoupon(value);
  };

  const handleCouponValidity = async (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();

    const regExCoupon = /^\S*$/;
    if(regExCoupon.test(coupon) && coupon !== ''){
      await getCoupon({coupon: coupon}).unwrap();
    } else {
      toast.info(FAIL_VALIDITY);
    }
  };

  useEffect(() => {
    if(data) {
      const value = data/100;
      setDiscount(value);
    }
  }, [data]);

  return {discount, isLoading, isError, isSuccess, handleCouponValidity, handleInput};
};
