import {ThunkActionResult} from '../types/actions';
import {loadGuitars} from './actions';
import {Guitar} from '../types/types';
import {APIRoute} from '../const';
import {Params} from '../const';

export const fetchGuitarsAction = (sortingType: string, sortingOrder: string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data, headers} = await api.get<Guitar[]>(APIRoute.Guitars,
      {params:
          {[Params.Start]: '0',
            [Params.End]: '9',
            [Params.Sort]:  sortingType,
            [Params.Order]: sortingOrder,
          }});
    // eslint-disable-next-line no-console
    console.log(headers['x-total-count']);
    dispatch(loadGuitars(data));
  };
