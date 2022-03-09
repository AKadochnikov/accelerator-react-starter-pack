import {Guitar} from '../../types/types';
import {useEffect, useState} from 'react';
import {useCartItem} from '../../hooks/use-cart-item/use-cart-item';
import {MAX_CART_VALUE} from '../../const';
import DeleteCartModal from '../delete-cart-modal/delete-cart-modal';

type CartItemProps = {
  guitar: Guitar;
}

function CartItem (props: CartItemProps): JSX.Element {
  const {guitar} = props;
  const {name, stringCount, vendorCode, previewImg, price, type, count, id} = guitar;
  const [isOpenedModal, setIsOpenedModal] = useState(false);
  const {currentCount, setCurrentCount, handleInputCount, handleIncrementCount, handleDecrementCount, imagePath, russianType, totalPrice} = useCartItem(id, previewImg, type, price, setIsOpenedModal);

  useEffect(() => {
    if (count !== undefined) {
      setCurrentCount(count);
    }
  }, [count, setCurrentCount]);
  return (
    <>
      {isOpenedModal? <DeleteCartModal price={price} type={russianType} name={name} vendorCode={vendorCode} imagePath={imagePath} stringCount={stringCount} setIsOpenedModal={setIsOpenedModal} id={id}/> : ''}
      <div className="cart-item" data-testid={'cart-item'}>
        <button onClick={() => setIsOpenedModal(true)} className="cart-item__close-button button-cross" type="button" aria-label="Удалить">
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
          <button onClick={handleDecrementCount} className="quantity__button" aria-label="Уменьшить количество" data-testid={'decrement-button'}>
            <svg width="8" height="8" aria-hidden="true">
              <use xlinkHref="#icon-minus"/>
            </svg>
          </button>
          <input onInput={handleInputCount} className="quantity__input" type="number" value={currentCount} placeholder="1" id="2-count" name="2-count" max="99"/>
          <button onClick={handleIncrementCount} className="quantity__button" aria-label="Увеличить количество" disabled={currentCount === MAX_CART_VALUE}>
            <svg width="8" height="8" aria-hidden="true">
              <use xlinkHref="#icon-plus"/>
            </svg>
          </button>
        </div>
        <div className="cart-item__price-total">{totalPrice} ₽</div>
      </div>
    </>
  );
}

export default CartItem;
