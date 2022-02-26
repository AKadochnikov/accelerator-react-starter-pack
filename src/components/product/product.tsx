import Icons from '../icons/icons';
import Header from '../header/header';
import {Link} from 'react-router-dom';
import {AppRoute, LoadingStatus} from '../../const';
import Footer from '../footer/footer';
import {useParams} from 'react-router-dom';
import {Comment, Params} from '../../types/types';
import {useFetchGuitar} from '../../hooks/use-fetch-guitar/use-fetch-guitar';
import {adaptImgPath} from '../../utils';
import Loading from '../loading/loading';
import NotFound from '../404-not-found/404';
import Rating from '../rating/rating';
import Tab from '../tab/tab';
import ReviewList from '../review-list/review-list';
import AddCommentModal from '../add-comment-modal/add-comment-modal';
import {useEffect, useState} from 'react';
import SuccessAddReviewModal from '../success-add-review-modal/success-add-review-modal';
import {isCatalog} from '../../const';
import {useOpenCommentModal} from '../../hooks/use-open-comment-modal/use-open-comment-modal';

function Product (): JSX.Element {
  const [isOpenedSuccessModal, setIsOpenedSuccessModal] = useState<boolean>(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const params: Params = useParams();
  const currentId = params.id;
  const {guitar, loadStatus} = useFetchGuitar(currentId);
  const {isOpenedCommentModal, setIsOpenedCommentModal, handleOpenCommentModal} = useOpenCommentModal();

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
      <Icons/>
      <div className="wrapper">
        <Header isCatalog={isCatalog.no}/>
        <main className="page-content" data-testid={'product'}>
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
              <a onClick={handleOpenCommentModal} className="button button--red-border button--big reviews__sumbit-button" href="#" data-testid={'add-comment-button'}>Оставить отзыв</a>
              <ReviewList comments={comments}/>
            </section>
          </div>
        </main>
        <Footer/>
      </div>
    </>
  );
}

export default Product;
