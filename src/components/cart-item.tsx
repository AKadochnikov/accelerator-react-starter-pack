import {Guitar} from '../types/types';
import {adaptImgPath, debouncedUpdateCount, getRussianType, updateCount} from '../utils';
import {FormEvent, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getAddedGuitars} from '../store/data/selectors';
import {MIN_CART_VALUE} from '../const';

type CartItemProps = {
  guitar: Guitar;
}

function CartItem (props: CartItemProps): JSX.Element {
  const {guitar} = props;
  const {name, stringCount, vendorCode, previewImg, price, type, count, id} = guitar;
  const [currentCount, setCurrentCount] = useState<number>(MIN_CART_VALUE);
  const dispatch = useDispatch();
  const addedGuitars = useSelector(getAddedGuitars);

  useEffect(() => {
    if (count !== undefined) {
      setCurrentCount(count);
    }
  }, [count]);

  const handleInputCount = (evt: FormEvent<HTMLInputElement>) => {
    const value = Number(evt.currentTarget.value);
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
    setCurrentCount(value);
    updateCount(value, dispatch, addedGuitars, id, setCurrentCount);
  };

  const imagePath = adaptImgPath(previewImg);
  const russianType = getRussianType(type);
  const totalPrice = currentCount * price;
  return (
    <div className="cart-item">
      <button className="cart-item__close-button button-cross" type="button" aria-label="Удалить">
        <span className="button-cross__icon"/>
        <span className="cart-item__close-button-interactive-area"/>
      </button>
      <div className="cart-item__image"><img src={imagePath} width="55" height="130" alt="ЭлектроГитара Честер bass"/>
      </div>
      <div className="product-info cart-item__info">
        <p className="product-info__title">{russianType} {name}</p>
        <p className="product-info__info">Артикул: {vendorCode}</p>
        <p className="product-info__info">{russianType}, {stringCount} струнная</p>
      </div>
      <div className="cart-item__price">{price} ₽</div>
      <div className="quantity cart-item__quantity">
        <button onClick={handleDecrementCount} className="quantity__button" aria-label="Уменьшить количество">
          <svg width="8" height="8" aria-hidden="true">
            <use xlinkHref="#icon-minus"/>
          </svg>
        </button>
        <input onInput={handleInputCount} className="quantity__input" type="number" value={currentCount} placeholder="1" id="2-count" name="2-count" max="99"/>
        <button onClick={handleIncrementCount} className="quantity__button" aria-label="Увеличить количество" disabled={currentCount === 99}>
          <svg width="8" height="8" aria-hidden="true">
            <use xlinkHref="#icon-plus"/>
          </svg>
        </button>
      </div>
      <div className="cart-item__price-total">{totalPrice} ₽</div>
    </div>
  );
}

export default CartItem;
