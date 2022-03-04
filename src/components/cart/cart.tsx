import Header from '../header/header';
import {AppRoute, isCatalog} from '../../const';
import {Link} from 'react-router-dom';
import Icons from '../icons/icons';
import Footer from '../footer/footer';
import {useGetGuitarsQuery} from '../../services/guitar-api/guitar-api';
import Loading from '../loading/loading';
import CartItem from '../cart-item/cart-item';
import {Guitar} from '../../types/types';
import {useSelector} from 'react-redux';
import {getAddedGuitars, getDiscount} from '../../store/data/selectors';
import {getCurrentGuitars} from '../../utils';
import {useEffect, useState} from 'react';
import {useCoupon} from '../../hooks/use-coupon/use-coupon';
import {usePrice} from '../../hooks/use-price/use-price';

function Cart (): JSX.Element {
  const {data, isFetching} = useGetGuitarsQuery('');
  const addedGuitars = useSelector(getAddedGuitars);
  const discount = useSelector(getDiscount);
  const {isSuccess, isError, handleCouponValidity, handleInput, isLoading} = useCoupon();
  const [guitars, setGuitars] = useState<Guitar[]>([]);
  const {totalPrice, resultPrice} = usePrice(guitars, discount);
  useEffect(() => {
    if (data) {
      setGuitars(getCurrentGuitars(data, addedGuitars));
    }
  }, [data, addedGuitars]);

  return (
    <>
      <Icons/>
      <div className="wrapper">
        <Header isCatalog={isCatalog.no}/>
        <main className="page-content">
          <div className="container">
            <h1 className="title title--bigger page-content__title">Корзина</h1>
            <ul className="breadcrumbs page-content__breadcrumbs">
              <li className="breadcrumbs__item"><Link to={AppRoute.Main} className="link">Главная</Link>
              </li>
              <li className="breadcrumbs__item"><Link to={`${AppRoute.Main}page_1?`} className="link">Каталог</Link>
              </li>
              <li className="breadcrumbs__item"><Link to={AppRoute.Cart} className="link">Корзина</Link>
              </li>
            </ul>
            <div className="cart">
              {isFetching? <Loading/> : guitars.map((item: Guitar) => <CartItem key={item.id} guitar={item}/>)}
              <div className="cart__footer">
                <div className="cart__coupon coupon">
                  <h2 className="title title--little coupon__title">Промокод на скидку</h2>
                  <p className="coupon__info">Введите свой промокод, если он у вас есть.</p>
                  <form className="coupon__form" id="coupon-form" method="post" action="/">
                    <div className="form-input coupon__input">
                      <label className="visually-hidden">Промокод</label>
                      <input onInput={handleInput} type="text" placeholder="Введите промокод" id="coupon" name="coupon"/>
                      {isSuccess? <p className="form-input__message form-input__message--success">Промокод принят</p>: ''}
                      {isError? <p className="form-input__message form-input__message--error">неверный промокод</p>: ''}
                    </div>
                    <button onClick={handleCouponValidity} className="button button--big coupon__button" disabled={isLoading}>Применить</button>
                  </form>
                </div>
                <div className="cart__total-info">
                  <p className="cart__total-item"><span className="cart__total-value-name">Всего:</span>
                    <span className="cart__total-value">{totalPrice} ₽</span>
                  </p>
                  <p className="cart__total-item"><span className="cart__total-value-name">Скидка:</span>
                    <span className={`cart__total-value ${discount && addedGuitars.length !== 0? 'cart__total-value--bonus' : ''}`}>{discount? -totalPrice*discount : 0} ₽</span>
                  </p>
                  <p className="cart__total-item"><span className="cart__total-value-name">К оплате:</span>
                    <span className="cart__total-value cart__total-value--payment">{resultPrice} ₽</span>
                  </p>
                  <button className="button button--red button--big cart__order-button">Оформить заказ</button>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer/>
      </div>
    </>
  );
}

export default Cart;
