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

export const changeMinPrice = (value: number) => ({
  type: ActionType.ChangeMinPrice,
  payload: {
    value,
  },
} as const);

export const changeMaxPrice = (value: number) => ({
  type: ActionType.ChangeMaxPrice,
  payload: {
    value,
  },
} as const);

export const changeLoadPriceStatus = (value: string) => ({
  type: ActionType.ChangeLoadStatus,
  payload: {
    value,
  },
} as const);

export const changeGuitarTypes = (item: string[]) => ({
  type: ActionType.ChangeGuitarTypes,
  payload: {
    item,
  },
} as const);

export const changeGuitarCounts = (item: number[]) => ({
  type: ActionType.ChangeGuitarCounts,
  payload: {
    item,
  },
} as const);

export const changeTotalGuitars = (value: number) => ({
  type: ActionType.ChangeTotalGuitars,
  payload: {
    value,
  },
} as const);

export const changePage = (value: number) => ({
  type: ActionType.ChangePage,
  payload: {
    value,
  },
} as const);

export const changeStart = (value: number) => ({
  type: ActionType.ChangeStart,
  payload: {
    value,
  },
} as const);

export const changeEnd = (value: number) => ({
  type: ActionType.ChangeEnd,
  payload: {
    value,
  },
} as const);
