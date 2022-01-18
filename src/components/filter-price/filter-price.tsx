import {FormEvent, useEffect, useState} from 'react';
import {debouncedValidityMaxPrice, debouncedValidityMinPrice} from '../../utils';
import {getPriceLoadStatus, getMaxPrice, getMinPrice, getParams} from '../../store/user/selectors';
import {State} from '../../types/state';
import {connect, ConnectedProps} from 'react-redux';
import {Params, PriceLoadStatus} from '../../const';
import {changeParams, changeLoadPriceStatus} from '../../store/actions';
import {ThunkAppDispatch} from '../../types/actions';
import {useHistory, useParams} from 'react-router-dom';
import {useSearch} from '../../hooks/useSearch';

const mapStateToProps = (state: State) => ({
  minPrice: getMinPrice(state),
  maxPrice: getMaxPrice(state),
  params: getParams(state),
  priceStatus: getPriceLoadStatus(state),
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  onChangeParams(params: string) {
    dispatch(changeParams(params));
  },
  onChangeLoadStatus(status: string) {
    dispatch(changeLoadPriceStatus(status));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux;

function FilterPrice (props: ConnectedComponentProps): JSX.Element {
  const {minPrice, maxPrice, params, onChangeParams, priceStatus, onChangeLoadStatus} = props;
  const [minCurrentPrice, setMinCurrentPrice] = useState<string | null>(null);
  const [maxCurrentPrice, setMaxCurrentPrice] = useState<string | null>(null);
  const history = useHistory();
  const {id} = useParams<{id: string}>();
  const adaptedId = Number(id);
  const search = useSearch();
  // eslint-disable-next-line no-console
  console.log(search.toString());

  const inputMinPriceHandler = (evt: FormEvent<HTMLInputElement>) => {
    const eventTarget = evt.currentTarget;
    void debouncedValidityMinPrice(eventTarget, maxPrice, minPrice, history, search, adaptedId);
  };

  const inputMaxPriceHandler = (evt: FormEvent<HTMLInputElement>) => {
    const eventTarget = evt.currentTarget;
    void debouncedValidityMaxPrice(eventTarget, maxPrice, minPrice, history, search, adaptedId);
  };

  useEffect(() => {
    if (priceStatus === PriceLoadStatus.Loaded && minPrice !== 0 && maxPrice !== 0) {
      setMinCurrentPrice(minPrice.toString());
      setMaxCurrentPrice(maxPrice.toString());
      onChangeLoadStatus(PriceLoadStatus.Ready);
    }
  }, [priceStatus, minPrice, maxPrice]);

  useEffect(() => {
    if (maxCurrentPrice === null || minCurrentPrice === null) {
      return;
    }
    const searchParams = new URLSearchParams(params);
    searchParams.set(Params.PriceMin, minCurrentPrice);
    searchParams.set(Params.PriceMax, maxCurrentPrice);
    onChangeParams(searchParams.toString());
  }, [maxCurrentPrice, minCurrentPrice]);

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

export default connector(FilterPrice);
