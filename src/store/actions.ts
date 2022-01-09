import {ActionType} from '../types/actions';
import {Guitar} from '../types/types';

export const loadGuitars = (guitars: Guitar[]) => ({
  type: ActionType.LoadGuitar,
  payload: {
    guitars,
  },
} as const);

export const changeParams = (params: string) => ({
  type: ActionType.ChangeParams,
  payload: {
    params,
  },
} as const);

export const initLoadParams = (params: string) => ({
  type: ActionType.InitParams,
  payload: {
    params,
  },
} as const);
