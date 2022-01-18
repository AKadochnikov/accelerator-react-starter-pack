import {FormEvent} from 'react';
import {checkId, debouncedValidityMaxPrice, debouncedValidityMinPrice} from '../../utils';
import {useHistory, useParams} from 'react-router-dom';
import {useSearch} from '../../hooks/useSearch';
import {useMinMaxPrice} from '../../hooks/useMinMaxPrice';

function FilterPrice (): JSX.Element {
  const history = useHistory();
  const {id} = useParams<{id: string}>();
  const currentId = checkId(id);
  const search = useSearch();
  const params = search.toString();
  const [minPrice, maxPrice] = useMinMaxPrice(params);

  const inputMinPriceHandler = (evt: FormEvent<HTMLInputElement>) => {
    const eventTarget = evt.currentTarget;
    void debouncedValidityMinPrice(eventTarget, maxPrice, minPrice, history, search, currentId);
  };

  const inputMaxPriceHandler = (evt: FormEvent<HTMLInputElement>) => {
    const eventTarget = evt.currentTarget;
    void debouncedValidityMaxPrice(eventTarget, maxPrice, minPrice, history, search, currentId);
  };

  return (
    <fieldset className="catalog-filter__block">
      <legend className="catalog-filter__block-title">Цена, ₽</legend>
      <div className="catalog-filter__price-range">
        <div className="form-input">
          <label className="visually-hidden">Минимальная цена</label>
          <input onInput={inputMinPriceHandler} type="number" min={minPrice} max={maxPrice} placeholder={minPrice.toString()} id="priceMin" name="от" data-testid={'minPrice'}/>
        </div>
        <div className="form-input">
          <label className="visually-hidden">Максимальная цена</label>
          <input onInput={inputMaxPriceHandler} type="number" min={minPrice} max={maxPrice} placeholder={maxPrice.toString()} id="priceMax" name="до" data-testid={'maxPrice'}/>
        </div>
      </div>
    </fieldset>
  );
}

export default FilterPrice;
