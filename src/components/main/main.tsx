import Icons from '../icons/icons';
import Header from '../header/header';
import Footer from '../footer/footer';
import CatalogCards from '../catalog-cards/catalog-cards';
import CatalogSort from '../catalog-sort/catalog-sort';
import CatalogFilter from '../catalog-filter/catalog-filter';
import {getGuitars} from '../../store/data/selectors';
import {getSortingType, getSortingOrder} from '../../store/user/selectors';
import {State} from '../../types/state';
import {ConnectedProps, connect} from 'react-redux';
import {ThunkAppDispatch} from '../../types/actions';
import {fetchGuitarsAction} from '../../store/api-actions';
import {useEffect} from 'react';
import {useHistory} from 'react-router-dom';

const mapStateToProps = (state: State) => ({
  guitars: getGuitars(state),
  sortingType: getSortingType(state),
  sortingOrder: getSortingOrder(state),
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  fetchGuitars(sortingType: string, sortingOrder: string) {
    dispatch(fetchGuitarsAction(sortingType, sortingOrder));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux;

function Main (props: ConnectedComponentProps): JSX.Element {
  const {guitars, sortingType, sortingOrder, fetchGuitars} = props;

  const history = useHistory();

  useEffect(() => fetchGuitars(sortingType, sortingOrder), [sortingType, sortingOrder, fetchGuitars]);
  useEffect(() => history.push('/?price_gte=10'), [history]);

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
