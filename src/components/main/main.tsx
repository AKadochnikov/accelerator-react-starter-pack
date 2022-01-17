import Icons from '../icons/icons';
import Header from '../header/header';
import Footer from '../footer/footer';
import Catalog from '../catalog';
import {getGuitars} from '../../store/data/selectors';
import {
  getEnd,
  getGuitarCounts,
  getGuitarTypes,
  getIsInit,
  getPage,
  getParams,
  getPriceLoadStatus, getStart
} from '../../store/user/selectors';
import {State} from '../../types/state';
import {ConnectedProps, connect} from 'react-redux';
import {ThunkAppDispatch} from '../../types/actions';
import {fetchGuitarsAction, fetchAllGuitarsAction} from '../../store/api-actions';
import {useEffect} from 'react';
import {useHistory, useLocation, useParams} from 'react-router-dom';
import {
  initLoadParams,
  changeLoadPriceStatus,
  changeMinPrice,
  changeMaxPrice,
  changeGuitarTypes,
  changeGuitarCounts,
  changeParams,
  changeStart,
  changeEnd,
  changePage
} from '../../store/actions';
import {Params, PriceLoadStatus} from '../../const';
import {memo} from 'react';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';

const mapStateToProps = (state: State) => ({
  guitars: getGuitars(state),
  params: getParams(state),
  isInit: getIsInit(state),
  priceStatus: getPriceLoadStatus(state),
  guitarTypes: getGuitarTypes(state),
  guitarCounts: getGuitarCounts(state),
  page: getPage(state),
  start: getStart(state),
  end: getEnd(state),
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
  changeTypes (types: string[]){
    dispatch(changeGuitarTypes(types));
  },
  changeCounts (counts: number[]){
    dispatch(changeGuitarCounts(counts));
  },
  onChangeParams(params: string) {
    dispatch(changeParams(params));
  },
  onChangeStart(value: number) {
    dispatch(changeStart(value));
  },
  onChangeEnd(value: number) {
    dispatch(changeEnd(value));
  },
  onChangePage(value:number) {
    dispatch(changePage(value));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux;

function Main (props: ConnectedComponentProps): JSX.Element {
  const {params, fetchGuitars, initParams, isInit, fetchAllGuitars, priceStatus, getPriceInURL, guitarTypes, guitarCounts, changeCounts, changeTypes, onChangeParams, page, start, end, onChangePage, onChangeStart, onChangeEnd} = props;
  const location = useLocation();
  const search = new URLSearchParams(location.search);
  const {id} = useParams<{id: string}>();
  const adaptedId = Number(id);

  const history = useHistory();

  if (!search.has(Params.Start) && !search.has(Params.End)) {
    search.set(Params.Start, '0');
    search.set(Params.End, '9');
  }

  if(params !== search.toString() && isInit === false) {
    const newTypes = guitarTypes.slice();
    const newCounts = guitarCounts.slice();
    const counts = search.getAll(Params.StringCount);
    const types = search.getAll(Params.GuitarType);
    types.forEach((type) => {
      newTypes.push(type);
    });
    counts.forEach((count) => {
      newCounts.push(Number(count));
    });

    const currentStart = Number(search.get(Params.Start));
    if (currentStart !== start && search.has(Params.Start)){
      onChangeStart(currentStart);
    }

    const currentEnd = Number(search.get(Params.End));
    if (currentEnd !== end && search.has(Params.End)) {
      onChangeEnd(currentEnd);
    }

    if (adaptedId !== page && id !== undefined) {
      onChangePage(adaptedId);
    }

    changeTypes(newTypes);
    changeCounts(newCounts);
    initParams(search.toString());
  } else if (isInit === false) {
    initParams(params);
  }

  useEffect(() => {
    const searchParams = new URLSearchParams(params);
    if (isInit === false) {
      return;
    }
    searchParams.delete(Params.StringCount);
    searchParams.delete(Params.GuitarType);
    if(guitarCounts.length !== 0) {
      guitarCounts.forEach((count) => {
        searchParams.append(Params.StringCount, count.toString());
      });
    }
    if(guitarTypes.length !== 0) {
      guitarTypes.forEach((type) => {
        searchParams.append(Params.GuitarType, type);
      });
    }
    onChangeParams(searchParams.toString());
  }, [guitarTypes, guitarCounts]);

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
  }, [fetchAllGuitars, params]);

  useEffect(() => {
    if (isInit === true) {
      history.push(`page_${page}?${params}`);
    }
  }, [history, params]);

  return (
    <>
      <Icons/>
      <div className="wrapper" data-testid={'main'}>
        <Header/>
        <main className="page-content">
          <div className="container">
            <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
            <ul className="breadcrumbs page-content__breadcrumbs">
              <li className="breadcrumbs__item"><Link to={AppRoute.Main} className="link" >Главная</Link>
              </li>
              <li className="breadcrumbs__item"><a className="link">Каталог</a>
              </li>
            </ul>
            <Catalog/>
          </div>
        </main>
        <Footer/>
      </div>
    </>
  );
}

export default connector(memo(Main));
