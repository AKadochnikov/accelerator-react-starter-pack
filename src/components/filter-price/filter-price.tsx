import {FormEvent, useEffect, useState} from 'react';
import {debouncedValidityMaxPrice, debouncedValidityMinPrice} from '../../utils';
import {useHistory} from 'react-router-dom';
import {useSearch} from '../../hooks/useSearch';
import {useMinMaxPrice} from '../../hooks/useMinMaxPrice';
import {Params} from '../../const';

function FilterPrice (): JSX.Element {
  const history = useHistory();
  const search = useSearch();
  const params = search.toString();
  const [minPrice, maxPrice] = useMinMaxPrice(params);
  const [currentMinPrice, setCurrentMinPrice] = useState(0);
  const [currentMaxPrice, setCurrentMaxPrice] = useState(0);

  const inputMinPriceHandler = (evt: FormEvent<HTMLInputElement>) => {
    const eventTarget = evt.currentTarget;
    const value = Number(evt.currentTarget.value);
    if (value < 0) {
      setCurrentMinPrice(minPrice);
    } else {
      setCurrentMinPrice(value);
    }
    void debouncedValidityMinPrice(eventTarget, maxPrice, minPrice, history, search, setCurrentMinPrice, currentMaxPrice);
  };

  const inputMaxPriceHandler = (evt: FormEvent<HTMLInputElement>) => {
    const eventTarget = evt.currentTarget;
    const value = Number(evt.currentTarget.value);
    if (value < 0) {
      setCurrentMaxPrice(currentMinPrice);
    } else {
      setCurrentMaxPrice(value);
    }
    void debouncedValidityMaxPrice(eventTarget, maxPrice, minPrice, history, search, setCurrentMaxPrice, currentMinPrice);
  };

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if(!search.has(Params.PriceMin)) {
      return;
    }
    const value = Number(search.get(Params.PriceMin));
    setCurrentMinPrice(value);
  }, [minPrice]);

  useEffect(() => {
    if(!search.has(Params.PriceMax)) {
      return;
    }
    const value = Number(search.get(Params.PriceMax));
    setCurrentMaxPrice(value);
  }, [maxPrice]);

  return (
    <fieldset className="catalog-filter__block">
      <legend className="catalog-filter__block-title">Цена, ₽</legend>
      <div className="catalog-filter__price-range">
        <div className="form-input">
          <label className="visually-hidden">Минимальная цена</label>
          <input
            onInput={inputMinPriceHandler}
            type="number"
            min={minPrice}
            max={maxPrice}
            value={currentMinPrice ? currentMinPrice : ''}
            placeholder={minPrice.toString()}
            id="priceMin"
            name="от"
            data-testid={'minPrice'}
          />
        </div>
        <div className="form-input">
          <label className="visually-hidden">Максимальная цена</label>
          <input
            onInput={inputMaxPriceHandler}
            type="number"
            min={minPrice}
            max={maxPrice}
            value={currentMaxPrice ? currentMaxPrice : ''}
            placeholder={maxPrice.toString()}
            id="priceMax"
            name="до"
            data-testid={'maxPrice'}
          />
        </div>
      </div>
    </fieldset>
  );
}

export default FilterPrice;
