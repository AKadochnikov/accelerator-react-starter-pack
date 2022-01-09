import {ThunkActionResult} from '../types/actions';
import {loadGuitars} from './actions';
import {Guitar} from '../types/types';
import {APIRoute} from '../const';

export const fetchGuitarsAction = (params: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data, headers} = await api.get<Guitar[]>(`${APIRoute.Guitars}/?${params}`);
    // eslint-disable-next-line no-console
    console.log(headers['x-total-count']);
    dispatch(loadGuitars(data));
  };
