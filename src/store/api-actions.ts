import {ThunkActionResult} from '../types/actions';
import {changeMaxPrice, changeMinPrice, loadGuitars, changeLoadPriceStatus} from './actions';
import {Guitar} from '../types/types';
import {APIRoute} from '../const';
import {PriceLoadStatus} from '../const';

export const fetchGuitarsAction = (params: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data, headers} = await api.get<Guitar[]>(`${APIRoute.Guitars}/?${params}`);
    // eslint-disable-next-line no-console
    console.log(headers['x-total-count']);
    dispatch(loadGuitars(data));
  };

export const fetchAllGuitarsAction = (params: string, priceStatus: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const {data} = await api.get<Guitar[]>(`${APIRoute.Guitars}/?${params}`);
      const value = data.map((item) => item.price);
      const minPrice = Math.min(...value);
      const maxPrice = Math.max(...value);
      dispatch(changeMinPrice(minPrice));
      dispatch(changeMaxPrice(maxPrice));
      if (priceStatus === PriceLoadStatus.NotLoaded) {
        dispatch(changeLoadPriceStatus(PriceLoadStatus.Loaded));
      }
    }
    catch {
      dispatch(changeLoadPriceStatus(PriceLoadStatus.NotLoaded));
    }
  };
