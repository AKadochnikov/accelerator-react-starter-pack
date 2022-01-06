import {Guitar} from './types';
import {RootState} from '../store/root-reducer';

export type Data = {
  guitars: Guitar[],
  isDataLoaded: boolean,
};

export type User = {
  sortingType: string | undefined,
  sortingValue: string | undefined,
}

export type State = RootState;
