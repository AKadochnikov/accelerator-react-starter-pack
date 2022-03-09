import {Link, useParams} from 'react-router-dom';
import {AppRoute, LoadingStatus} from '../../const';
import Rating from '../rating/rating';
import Tab from '../tab/tab';
import ReviewList from '../review-list/review-list';
import {Comment, Params} from '../../types/types';
import {useEffect, useState} from 'react';
import {useFetchGuitar} from '../../hooks/use-fetch-guitar/use-fetch-guitar';
import Loading from '../loading/loading';
import NotFound from '../404-not-found/404';
import {adaptImgPath} from '../../utils';
import AddCommentModal from '../add-comment-modal/add-comment-modal';
import SuccessAddReviewModal from '../success-add-review-modal/success-add-review-modal';
import AddCartModal from '../add-cart-modal/add-cart-modal';
import SuccessAddCartModal from '../success-add-cart-modal/success-add-cart-modal';
import {useOpenCommentModal} from '../../hooks/use-open-comment-modal/use-open-comment-modal';
import {useOpenCartModal} from '../../hooks/use-open-cart-modal/use-open-cart-modal';
import {useOpenSuccessCartModal} from '../../hooks/use-open-success-cart-modal/use-open-success-cart-modal';

function ProductItem ():JSX.Element {
  const params: Params = useParams();
  const [isOpenedSuccessModal, setIsOpenedSuccessModal] = useState<boolean>(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const {isOpenedCommentModal, setIsOpenedCommentModal, handleOpenCommentModal} = useOpenCommentModal();
  const {handleOpenCartModal, isOpenedCartModal, setIsOpenedCartModal} = useOpenCartModal();
  const {isOpenedSuccessCartModal, setIsOpenedSuccessCartModal} = useOpenSuccessCartModal();
  const currentId = params.id;
  const {guitar, loadStatus} = useFetchGuitar(currentId);

  useEffect(() => {
    if(guitar) {
      setComments(guitar.comments);
    }
  }, [guitar]);

  if (guitar === null && loadStatus === LoadingStatus.Loading) {
    return <Loading/>;
  } else if (loadStatus === LoadingStatus.Error) {
    return <NotFound/>;
  } else if (guitar === null){
    return <Loading/>;
  }

  const {previewImg, name, type, description, vendorCode, stringCount, price, rating, id} = guitar;
  document.title = name;
  const imgPath = adaptImgPath(previewImg);

  if (isOpenedCommentModal) {
    document.body.setAttribute('aria-hidden', 'true');
  }
  return (
    <>
      {isOpenedCommentModal? <AddCommentModal setIsOpenedCommentModal={setIsOpenedCommentModal} setIsOpenedSuccessModal={setIsOpenedSuccessModal} guitarName={name} id={id}/>: ''}
      {isOpenedSuccessModal? <SuccessAddReviewModal setIsOpen={setIsOpenedSuccessModal} setComments={setComments} id={id}/> : ''}
      {isOpenedCartModal? <AddCartModal setIsOpenedCartModal={setIsOpenedCartModal} setIsOpenedSuccessCartModal={setIsOpenedSuccessCartModal} type={type} name={name} stringCount={stringCount} price={price} vendorCode={vendorCode} imgPath={imgPath} id={id}/> : ''}
      {isOpenedSuccessCartModal? <SuccessAddCartModal setIsOpenedSuccessCartModal={setIsOpenedSuccessCartModal} currentPage={AppRoute.Guitar}/> : ''}
      <main className="page-content" data-testid={'product-item'}>
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
              <Link onClick={handleOpenCartModal} className="button button--red button--big product-container__button" to={'#'} data-testid={'add-cart-in-product'}>Добавить в корзину</Link>
            </div>
          </div>
          <section className="reviews">
            <h3 className="reviews__title title title--bigger">Отзывы</h3>
            <Link onClick={handleOpenCommentModal} className="button button--red-border button--big reviews__sumbit-button" to={'#'} data-testid={'add-comment-button'}>Оставить отзыв</Link>
            <ReviewList comments={comments}/>
          </section>
        </div>
      </main>
    </>
  );
}

export default ProductItem;
