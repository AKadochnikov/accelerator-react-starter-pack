import Icons from '../icons/icons';
import Header from '../header/header';
import {Link} from 'react-router-dom';
import {AppRoute, LoadingStatus} from '../../const';
import Footer from '../footer/footer';
import {useParams} from 'react-router-dom';
import {Params} from '../../types/types';
import {useFetchGuitar} from '../../hooks/useFetchGuitar';
import {adaptImgPath} from '../../utils';
import Loading from '../loading/loading';
import NotFound from '../404-not-found/404';
import Rating from '../rating/rating';
import Tab from '../tab/tab';

function Product (): JSX.Element {
  const params: Params = useParams();
  const currentId = params.id;
  const isCatalog = false;


  const {guitar, loadStatus} = useFetchGuitar(currentId);

  if (guitar === null && loadStatus === LoadingStatus.Loading) {
    return <Loading/>;
  } else if (loadStatus === LoadingStatus.Error) {
    return <NotFound/>;
  } else if (guitar === null){
    return <Loading/>;
  }

  const {previewImg, name, type, description, vendorCode, stringCount, price, comments, rating, id} = guitar;
  document.title = name;

  const imgPath = adaptImgPath(previewImg);

  return (
    <>
      <Icons/>
      <div className="wrapper">
        <Header isCatalog={isCatalog}/>
        <main className="page-content">
          <div className="container">
            <h1 className="page-content__title title title--bigger">Товар</h1>
            <ul className="breadcrumbs page-content__breadcrumbs">
              <li className="breadcrumbs__item"><Link to={AppRoute.Main} className="link" >Главная</Link>
              </li>
              <li className="breadcrumbs__item"><Link to={`${AppRoute.Main}page_1`} className="link">Каталог</Link>
              </li>
              <li className="breadcrumbs__item"><Link to={`${AppRoute.CurrentGuitar}${currentId}`} className="link">{name}</Link>
              </li>
            </ul>
            <div className="product-container">
              <img className="product-container__img" src={`/${imgPath}`} width="90" height="235" alt={`${name} ${type}`}/>
              <div className="product-container__info-wrapper">
                <h2 className="product-container__title title title--big title--uppercase">{name}</h2>
                <div className="rate product-container__rating" aria-hidden="true">
                  <Rating rating={rating} id={id} comments={comments}/>
                </div>
                <Tab vendorCode={vendorCode} type={type} stringCount={stringCount} description={description}/>
              </div>
              <div className="product-container__price-wrapper">
                <p className="product-container__price-info product-container__price-info--title">Цена:</p>
                <p className="product-container__price-info product-container__price-info--value">{price} ₽</p>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a className="button button--red button--big product-container__button" href="#">Добавить в корзину</a>
              </div>
            </div>
            <section className="reviews">
              <h3 className="reviews__title title title--bigger">Отзывы</h3>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a className="button button--red-border button--big reviews__sumbit-button" href="#">Оставить отзыв</a>
              <div className="review">
                <div className="review__wrapper">
                  <h4 className="review__title review__title--author title title--lesser">Иванов Максим</h4>
                  <span className="review__date">12 декабря</span>
                </div>
                <div className="rate review__rating-panel" aria-hidden="true">
                  <span className="visually-hidden">Рейтинг:</span>
                  <svg width="16" height="16" aria-hidden="true">
                    <use xlinkHref="#icon-full-star"/>
                  </svg>
                  <svg width="16" height="16" aria-hidden="true">
                    <use xlinkHref="#icon-full-star"/>
                  </svg>
                  <svg width="16" height="16" aria-hidden="true">
                    <use xlinkHref="#icon-full-star"/>
                  </svg>
                  <svg width="16" height="16" aria-hidden="true">
                    <use xlinkHref="#icon-full-star"/>
                  </svg>
                  <svg width="16" height="16" aria-hidden="true">
                    <use xlinkHref="#icon-star"/>
                  </svg>
                  <span className="rate__count"/><span className="rate__message"/>
                </div>
                <h4 className="review__title title title--lesser">Достоинства:</h4>
                <p className="review__value">Хороший корпус, чистый звук, стурны хорошего качества</p>
                <h4 className="review__title title title--lesser">Недостатки:</h4>
                <p className="review__value">Тугие колонки</p>
                <h4 className="review__title title title--lesser">Комментарий:</h4>
                <p className="review__value">У гитары отличный цвет, хороше дерево. Тяжелая, в компдлекте неть чехла и
                  ремня.
                </p>
              </div>
              <div className="review">
                <div className="review__wrapper">
                  <h4 className="review__title review__title--author title title--lesser">Перова Ольга</h4>
                  <span className="review__date">12 декабря</span>
                </div>
                <div className="rate review__rating-panel" aria-hidden="true">
                  <span className="visually-hidden">Рейтинг:</span>
                  <svg width="16" height="16" aria-hidden="true">
                    <use xlinkHref="#icon-full-star"/>
                  </svg>
                  <svg width="16" height="16" aria-hidden="true">
                    <use xlinkHref="#icon-full-star"/>
                  </svg>
                  <svg width="16" height="16" aria-hidden="true">
                    <use xlinkHref="#icon-full-star"/>
                  </svg>
                  <svg width="16" height="16" aria-hidden="true">
                    <use xlinkHref="#icon-full-star"/>
                  </svg>
                  <svg width="16" height="16" aria-hidden="true">
                    <use xlinkHref="#icon-star"/>
                  </svg>
                  <span className="rate__count"/><span className="rate__message"/>
                </div>
                <h4 className="review__title title title--lesser">Достоинства:</h4>
                <p className="review__value">Хороший корпус, чистый звук, стурны хорошего качества</p>
                <h4 className="review__title title title--lesser">Недостатки:</h4>
                <p className="review__value">Тугие колонки</p>
                <h4 className="review__title title title--lesser">Комментарий:</h4>
                <p className="review__value">У гитары отличный цвет, хороше дерево. Тяжелая, в компдлекте неть чехла и
                  ремня.
                </p>
              </div>
              <div className="review">
                <div className="review__wrapper">
                  <h4 className="review__title review__title--author title title--lesser">Преображенская Ксения</h4>
                  <span className="review__date">12 декабря</span>
                </div>
                <div className="rate review__rating-panel" aria-hidden="true">
                  <span className="visually-hidden">Рейтинг:</span>
                  <svg width="16" height="16" aria-hidden="true">
                    <use xlinkHref="#icon-full-star"/>
                  </svg>
                  <svg width="16" height="16" aria-hidden="true">
                    <use xlinkHref="#icon-full-star"/>
                  </svg>
                  <svg width="16" height="16" aria-hidden="true">
                    <use xlinkHref="#icon-full-star"/>
                  </svg>
                  <svg width="16" height="16" aria-hidden="true">
                    <use xlinkHref="#icon-full-star"/>
                  </svg>
                  <svg width="16" height="16" aria-hidden="true">
                    <use xlinkHref="#icon-star"/>
                  </svg>
                  <span className="rate__count"/><span className="rate__message"/>
                </div>
                <h4 className="review__title title title--lesser">Достоинства:</h4>
                <p className="review__value">Хороший корпус, чистый звук, стурны хорошего качества</p>
                <h4 className="review__title title title--lesser">Недостатки:</h4>
                <p className="review__value">Тугие колонки</p>
                <h4 className="review__title title title--lesser">Комментарий:</h4>
                <p className="review__value">У гитары отличный цвет, хороше дерево. Тяжелая, в компдлекте неть чехла и
                  ремня. У гитары отличный цвет, хороше дерево. Тяжелая, в компдлекте неть чехла и ремня. У гитары
                  отличный
                  цвет, хороше дерево. Тяжелая, в компдлекте неть чехла и ремня. У гитары отличный цвет, хороше дерево.
                  Тяжелая, в компдлекте неть чехла и ремня.
                </p>
              </div>
              <button className="button button--medium reviews__more-button">Показать еще отзывы</button>
              <a className="button button--up button--red-border button--big reviews__up-button" href="#header">Наверх</a>
            </section>
          </div>
        </main>
        <Footer/>
      </div>
    </>
  );
}

export default Product;
