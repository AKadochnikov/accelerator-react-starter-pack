import {FormEvent, useState} from 'react';
import {debouncedValidityMinPrice} from '../../utils';
import {getMaxPrice, getMinPrice} from '../../store/user/selectors';
import {State} from '../../types/state';
import {connect, ConnectedProps} from 'react-redux';

const mapStateToProps = (state: State) => ({
  minPrice: getMinPrice(state),
  maxPrice: getMaxPrice(state),
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux;

function FilterPrice (props: ConnectedComponentProps): JSX.Element {
  const {minPrice, maxPrice} = props;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [minCurrentPrice, setMinCurrentPrice] = useState<string>('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [maxCurrentPrice, setMaxCurrentPrice] = useState<string>('');

  // eslint-disable-next-line no-console
  console.log(minCurrentPrice);

  const inputMinPriceHandler = (evt: FormEvent<HTMLInputElement>) => {
    const eventTarget = evt.currentTarget;
    void debouncedValidityMinPrice(eventTarget, minPrice, setMinCurrentPrice);
  };

  return (
    <fieldset className="catalog-filter__block">
      <legend className="catalog-filter__block-title">Цена, ₽</legend>
      <div className="catalog-filter__price-range">
        <div className="form-input">
          <label className="visually-hidden">Минимальная цена</label>
          <input onInput={inputMinPriceHandler} type="number" min={minPrice} max={maxPrice} placeholder={minPrice.toString()} id="priceMin" name="от"/>
        </div>
        <div className="form-input">
          <label className="visually-hidden">Максимальная цена</label>
          <input type="number" placeholder={maxPrice.toString()} min={minPrice} max={maxPrice} id="priceMax" name="до"/>
        </div>
      </div>
    </fieldset>
  );
}

export default connector(FilterPrice);
