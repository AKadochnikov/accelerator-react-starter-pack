import {connect, ConnectedProps} from 'react-redux';
import {SortingParams} from '../../const';
import {getSortingType, getSortingOrder} from '../../store/user/selectors';
import {State} from '../../types/state';
import {ThunkAppDispatch} from '../../types/actions';
import {changeSortingType, changeSortingOrder} from '../../store/actions';
import {MouseEvent} from 'react';

const mapStateToProps = (state: State) => ({
  sortingType: getSortingType(state),
  sortingOrder: getSortingOrder(state),
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  onChangeType(sortingType: string) {
    dispatch(changeSortingType(sortingType));
  },
  onChangeOrder(sortingOrder: string) {
    dispatch(changeSortingOrder(sortingOrder));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function CatalogSort (props: PropsFromRedux):JSX.Element {
  const {sortingType, sortingOrder, onChangeType, onChangeOrder} = props;

  const handleTypeChange = (evt: MouseEvent<HTMLButtonElement>) => {
    onChangeType(evt.currentTarget.value);
  };

  const handleOrderChange = (evt: MouseEvent<HTMLButtonElement>) => {
    if (sortingType === '') {
      onChangeType(SortingParams.Price);
    }
    onChangeOrder(evt.currentTarget.value);
  };


  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type" >
        <button onClick={handleTypeChange} className={`catalog-sort__type-button ${sortingType === SortingParams.Price? 'catalog-sort__type-button--active' : ''}`} value={SortingParams.Price} aria-label='по цене' tabIndex={sortingType === SortingParams.Price? -1 : 0}>по цене</button>
        <button onClick={handleTypeChange} className={`catalog-sort__type-button ${sortingType === SortingParams.Rating? 'catalog-sort__type-button--active' : ''}`} value={SortingParams.Rating} aria-label="по популярности" tabIndex={sortingType === SortingParams.Price? -1 : 0}>по популярности</button>
      </div>
      <div className="catalog-sort__order">
        <button onClick={handleOrderChange} className={`catalog-sort__order-button catalog-sort__order-button--up ${sortingOrder === SortingParams.Asc? 'catalog-sort__order-button--active': ''}`} value={SortingParams.Asc} aria-label="По возрастанию" tabIndex={sortingOrder === SortingParams.Asc? -1 : 0}/>
        <button onClick={handleOrderChange} className={`catalog-sort__order-button catalog-sort__order-button--down ${sortingOrder === SortingParams.Desc? 'catalog-sort__order-button--active': ''}`} value={SortingParams.Desc} aria-label="По убыванию" tabIndex={sortingOrder === SortingParams.Desc? -1 : 0}/>
      </div>
    </div>
  );
}

export default connector(CatalogSort);
