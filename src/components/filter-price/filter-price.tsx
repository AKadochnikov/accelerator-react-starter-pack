import {FormEvent, useEffect, useState} from 'react';
import {debouncedValidityMaxPrice, debouncedValidityMinPrice} from '../../utils';
import {useHistory} from 'react-router-dom';
import {useSearch} from '../../hooks/use-search/use-search';
import {useMinMaxPrice} from '../../hooks/use-min-max-price/use-min-max-price';
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

  const searchMinPrice = Number(search.get(Params.PriceMin));
  const searchMaxPrice = Number(search.get(Params.PriceMax));

  useEffect(() => {
    if(!searchMinPrice) {
      return;
    }
    setCurrentMinPrice(searchMinPrice);
  }, [minPrice, searchMinPrice]);

  useEffect(() => {
    if(!searchMaxPrice) {
      return;
    }
    setCurrentMaxPrice(searchMaxPrice);
  }, [maxPrice, searchMaxPrice]);

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
