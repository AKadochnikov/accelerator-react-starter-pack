import {connect, ConnectedProps} from 'react-redux';
import {SortingParams, Params} from '../../const';
import {getParams} from '../../store/user/selectors';
import {State} from '../../types/state';
import {ThunkAppDispatch} from '../../types/actions';
import {changeParams} from '../../store/actions';
import {MouseEvent} from 'react';

const mapStateToProps = (state: State) => ({
  params: getParams(state),
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  onChangeParams(params: string) {
    dispatch(changeParams(params));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function CatalogSort (props: PropsFromRedux):JSX.Element {

  const {onChangeParams, params} = props;

  const searchParams = new URLSearchParams(params);

  const handleTypeChange = (evt: MouseEvent<HTMLButtonElement>) => {
    searchParams.set(Params.Sort, evt.currentTarget.value);
    if (!searchParams.has(Params.Order)) {
      searchParams.set(Params.Order, SortingParams.Asc);
    }
    onChangeParams(searchParams.toString());
  };

  const handleOrderChange = (evt: MouseEvent<HTMLButtonElement>) => {
    searchParams.set(Params.Order, evt.currentTarget.value);
    if(!searchParams.has(Params.Sort)) {
      searchParams.set(Params.Sort, SortingParams.Price);
    }
    onChangeParams(searchParams.toString());
  };

  const sortingType = searchParams.get(Params.Sort);
  const sortingOrder = searchParams.get(Params.Order);

  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type" >
        <button onClick={handleTypeChange} className={`catalog-sort__type-button ${sortingType === SortingParams.Price? 'catalog-sort__type-button--active' : ''}`} value={SortingParams.Price} aria-label='по цене' tabIndex={sortingType === SortingParams.Price? -1 : 0}>по цене</button>
        <button onClick={handleTypeChange} className={`catalog-sort__type-button ${sortingType === SortingParams.Rating? 'catalog-sort__type-button--active' : ''}`} value={SortingParams.Rating} aria-label="по популярности" tabIndex={sortingType === SortingParams.Rating? -1 : 0}>по популярности</button>
      </div>
      <div className="catalog-sort__order">
        <button onClick={handleOrderChange} className={`catalog-sort__order-button catalog-sort__order-button--up ${sortingOrder === SortingParams.Asc? 'catalog-sort__order-button--active': ''}`} value={SortingParams.Asc} aria-label="По возрастанию" tabIndex={sortingOrder === SortingParams.Asc? -1 : 0}/>
        <button onClick={handleOrderChange} className={`catalog-sort__order-button catalog-sort__order-button--down ${sortingOrder === SortingParams.Desc? 'catalog-sort__order-button--active': ''}`} value={SortingParams.Desc} aria-label="По убыванию" tabIndex={sortingOrder === SortingParams.Desc? -1 : 0}/>
      </div>
    </div>
  );
}

export default connector(CatalogSort);
