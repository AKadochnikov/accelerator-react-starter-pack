import {Guitar} from '../../types/types';
import {adaptImgPath} from '../../utils';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';
import Rating from '../rating/rating';
import {useOpenCartModal} from '../../hooks/use-open-cart-modal/use-open-cart-modal';
import AddCartModal from '../add-cart-modal/add-cart-modal';
import {useOpenSuccessCartModal} from '../../hooks/use-open-success-cart-modal/use-open-success-cart-modal';
import SuccessAddCartModal from '../success-add-cart-modal/success-add-cart-modal';
import {useSelector} from 'react-redux';
import {getAddedGuitars} from '../../store/data/selectors';

type CardProps = {
  guitar: Guitar,
}

function Card (props: CardProps): JSX.Element {
  const {guitar} = props;
  const {previewImg, name, price, rating, id, comments, type, vendorCode, stringCount} = guitar;
  const addedGuitars = useSelector(getAddedGuitars);
  const imgPath = adaptImgPath(previewImg);
  const {handleOpenCartModal, isOpenedCartModal, setIsOpenedCartModal} = useOpenCartModal();
  const {isOpenedSuccessCartModal, setIsOpenedSuccessCartModal} = useOpenSuccessCartModal();
  const addedGuitarsId: number[] = addedGuitars.map((item) => item.id);

  return (
    <>
      {isOpenedCartModal? <AddCartModal setIsOpenedCartModal={setIsOpenedCartModal} setIsOpenedSuccessCartModal={setIsOpenedSuccessCartModal} type={type} name={name} stringCount={stringCount} price={price} vendorCode={vendorCode} imgPath={imgPath} id={id}/> : ''}
      {isOpenedSuccessCartModal? <SuccessAddCartModal setIsOpenedSuccessCartModal={setIsOpenedSuccessCartModal}/> : ''}
      <div className="product-card">
        <img src={imgPath} width="75" height="190" alt={`${name} ${type}`}/>
        <div className="product-card__info">
          <div className="rate product-card__rate" aria-hidden="true">
            <Rating rating={rating} id={id} comments={comments}/>
          </div>
          <p className="product-card__title">{name}</p>
          <p className="product-card__price"><span className="visually-hidden">Цена:</span>{price} ₽
          </p>
        </div>
        <div className="product-card__buttons"><Link className="button button--mini" to={`${AppRoute.CurrentGuitar}${id}`}>Подробнее</Link>
          {addedGuitarsId.includes(id)?
            <Link className="button button--red-border button--mini button--in-cart" to={AppRoute.Cart}>В корзине</Link> :
            <Link onClick={handleOpenCartModal} className="button button--red button--mini button--add-to-cart" to={'#'} data-testid={'add-cart-in-card'}>Купить</Link>}
        </div>
      </div>
    </>
  );
}

export default Card;
