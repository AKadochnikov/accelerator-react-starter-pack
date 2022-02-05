import {Guitar} from '../../types/types';
import {adaptImgPath} from '../../utils';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';
import Rating from '../rating/rating';

type CardProps = {
  guitar: Guitar,
}

function Card (props: CardProps): JSX.Element {
  const {guitar} = props;
  const {previewImg, name, price, rating, id, comments, type} = guitar;
  const imgPath = adaptImgPath(previewImg);

  return (
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
        <Link className="button button--red button--mini button--add-to-cart" to={'#'}>Купить</Link>
      </div>
    </div>
  );
}

export default Card;
