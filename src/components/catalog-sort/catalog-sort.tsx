import {SortingParams, Params, AppRoute} from '../../const';
import {MouseEvent} from 'react';
import {useSearch} from '../../hooks/useSearch';
import {useHistory, useParams} from 'react-router-dom';
import {checkId} from '../../utils';

function CatalogSort ():JSX.Element {
  const search = useSearch();
  const history = useHistory();
  const {id} = useParams<{id: string}>();
  const page = checkId(id);

  const handleTypeChange = (evt: MouseEvent<HTMLButtonElement>) => {
    search.set(Params.Sort, evt.currentTarget.value);
    if (!search.has(Params.Order)) {
      search.set(Params.Order, SortingParams.Asc);
    }
    history.push(`${AppRoute.Main}page_${page}?${search.toString()}`);
  };

  const handleOrderChange = (evt: MouseEvent<HTMLButtonElement>) => {
    search.set(Params.Order, evt.currentTarget.value);
    if(!search.has(Params.Sort)) {
      search.set(Params.Sort, SortingParams.Price);
    }
    history.push(`${AppRoute.Main}page_${page}?${search.toString()}`);
  };

  const sortingType = search.get(Params.Sort);
  const sortingOrder = search.get(Params.Order);

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

export default CatalogSort;
