import {ThunkActionResult} from '../types/actions';
import {loadGuitars} from './actions';
import {Guitar} from '../types/types';
import {APIRoute, SortingParams} from '../const';
import {Params} from '../const';

export const fetchGuitarsAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Guitar[]>(APIRoute.Guitars,
      {params:
          {[Params.Start]: '0',
            [Params.End]: '9',
          }});
    dispatch(loadGuitars(data));
  };

export const fetchSortedGuitarsAction = (sortingType:string = SortingParams.Price, sortingValue:string): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Guitar[]>(APIRoute.Guitars,
      {params:
          {[Params.Sort]: sortingType,
            [Params.Order]: sortingValue,
          }});
    dispatch(loadGuitars(data));
  };
