import {debounce} from 'ts-debounce';
import {useHistory} from 'react-router-dom';
import {ChangeEvent, useState} from 'react';


function FilterPrice (): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [minPrice, setMinPrice] = useState<string>('0');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [maxPrice, setMaxPrice] = useState<string>('0');

  const history = useHistory();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const debouncedHistory = debounce(history.push, 2000);

  const inputMinPriceHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    // eslint-disable-next-line no-console
    setMinPrice(evt.target.value);
  };

  return (
    <fieldset className="catalog-filter__block">
      <legend className="catalog-filter__block-title">Цена, ₽</legend>
      <div className="catalog-filter__price-range">
        <div className="form-input">
          <label className="visually-hidden">Минимальная цена</label>
          <input onInput={inputMinPriceHandler} type="number" placeholder="1 000" id="priceMin" name="от"/>
        </div>
        <div className="form-input">
          <label className="visually-hidden">Максимальная цена</label>
          <input type="number" placeholder="30 000" id="priceMax" name="до"/>
        </div>
      </div>
    </fieldset>
  );
}

export default FilterPrice;
