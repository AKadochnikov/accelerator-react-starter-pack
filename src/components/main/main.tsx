import Icons from '../icons/icons';
import Header from '../header/header';
import Footer from '../footer/footer';
import CatalogCards from '../catalog-cards/catalog-cards';
import CatalogSort from '../catalog-sort/catalog-sort';
import CatalogFilter from '../catalog-filter/catalog-filter';
import {getGuitars} from '../../store/data/selectors';
import {getIsInit, getParams, getPriceLoadStatus} from '../../store/user/selectors';
import {State} from '../../types/state';
import {ConnectedProps, connect} from 'react-redux';
import {ThunkAppDispatch} from '../../types/actions';
import {fetchGuitarsAction, fetchAllGuitarsAction} from '../../store/api-actions';
import {useEffect} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import {initLoadParams, changeLoadPriceStatus, changeMinPrice, changeMaxPrice} from '../../store/actions';
import {Params, PriceLoadStatus} from '../../const';

const mapStateToProps = (state: State) => ({
  guitars: getGuitars(state),
  params: getParams(state),
  isInit: getIsInit(state),
  priceStatus: getPriceLoadStatus(state),
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  fetchGuitars(params: string) {
    void dispatch(fetchGuitarsAction(params));
  },
  fetchAllGuitars(params: string, priceStatus: string) {
    void dispatch(fetchAllGuitarsAction(params, priceStatus));
  },
  initParams(searchParams: string) {
    void dispatch(initLoadParams(searchParams));
  },
  getPriceInURL (status: string, minPrice: number, maxPrice: number) {
    void dispatch(changeMinPrice(minPrice));
    void dispatch(changeMaxPrice(maxPrice));
    void dispatch(changeLoadPriceStatus(status));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux;

function Main (props: ConnectedComponentProps): JSX.Element {
  const {guitars, params, fetchGuitars, initParams, isInit, fetchAllGuitars, priceStatus, getPriceInURL} = props;
  const location = useLocation();
  const search = new URLSearchParams(location.search);

  const history = useHistory();

  if (!search.has(Params.Start) && !search.has(Params.End)) {
    search.set(Params.Start, '0');
    search.set(Params.End, '9');
  }

  if(params !== search.toString() && isInit === false) {
    initParams(search.toString());
  } else if (isInit === false) {
    initParams(params);
  }

  useEffect(() => fetchGuitars(params), [fetchGuitars, params]);

  useEffect(() => {

    const searchParams = new URLSearchParams(params);

    if (priceStatus === PriceLoadStatus.NotLoaded && search.has(Params.PriceMin) && search.has(Params.PriceMax)){
      const minValue = search.get(Params.PriceMin);
      const maxValue = search.get(Params.PriceMax);
      getPriceInURL(PriceLoadStatus.Loaded, Number(minValue), Number(maxValue));
      fetchAllGuitars(searchParams.toString(), PriceLoadStatus.Loaded);
      return;
    }
    searchParams.delete(Params.PriceMin);
    searchParams.delete(Params.PriceMax);
    searchParams.delete(Params.Start);
    searchParams.delete(Params.End);
    fetchAllGuitars(searchParams.toString(), priceStatus);
  }, [fetchAllGuitars, params, priceStatus]);

  useEffect(() => {
    if (isInit === true) {
      history.push(`/?${params}`);
    }
  }, [history, params]);

  return (
    <>
      <Icons/>
      <div className="wrapper">
        <Header/>
        <main className="page-content">
          <div className="container">
            <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
            <ul className="breadcrumbs page-content__breadcrumbs">
              <li className="breadcrumbs__item"><a className="link" href="./main.html">Главная</a>
              </li>
              <li className="breadcrumbs__item"><a className="link">Каталог</a>
              </li>
            </ul>
            <div className="catalog">
              <CatalogFilter/>
              <CatalogSort/>
              <CatalogCards guitars={guitars}/>
              <div className="pagination page-content__pagination">
                <ul className="pagination__list">
                  <li className="pagination__page pagination__page--active">
                    <a className="link pagination__page-link" href="1">1</a>
                  </li>
                  <li className="pagination__page"><a className="link pagination__page-link" href="2">2</a>
                  </li>
                  <li className="pagination__page"><a className="link pagination__page-link" href="3">3</a>
                  </li>
                  <li className="pagination__page pagination__page--next" id="next">
                    <a className="link pagination__page-link" href="2">Далее</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </main>
        <Footer/>
      </div>
    </>
  );
}

export default connector(Main);
