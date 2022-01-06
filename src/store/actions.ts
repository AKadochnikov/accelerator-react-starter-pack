import {ActionType} from '../types/actions';
import {Guitar} from '../types/types';

export const loadGuitars = (guitars: Guitar[]) => ({
  type: ActionType.LoadGuitar,
  payload: {
    guitars,
  },
} as const);

export const changeSortingType = (sortingType: string) => ({
  type: ActionType.ChangeSortingType,
  payload: {
    sortingType,
  },
} as const);

export const changeSortingValue = (sortingValue: string) => ({
  type: ActionType.ChangeSortingValue,
  payload: {
    sortingValue,
  },
} as const);
