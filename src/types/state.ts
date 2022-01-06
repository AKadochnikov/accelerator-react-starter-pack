import {Guitar} from './types';
import {RootState} from '../store/root-reducer';

export type Data = {
  guitars: Guitar[],
  isDataLoaded: boolean,
};

export type User = {
  sortingType: string,
  sortingOrder: string,
}

export type State = RootState;
