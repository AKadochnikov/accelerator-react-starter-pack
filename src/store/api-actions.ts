import {ThunkActionResult} from '../types/actions';
import {loadGuitars} from './actions';
import {Guitar} from '../types/types';
import {APIRoute} from '../const';

export const fetchGuitarsAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Guitar[]>(APIRoute.Guitars,
      {params:
          {_start: '0',
            _end: '9',
          }});
    dispatch(loadGuitars(data));
  };
