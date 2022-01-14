import {Guitar} from './types';
import {RootState} from '../store/root-reducer';

export type Data = {
  guitars: Guitar[],
  isDataLoaded: boolean,
};

export type User = {
  params: string,
  isInit: boolean,
  minPrice: number,
  maxPrice: number,
  priceStatus: string,
  guitarTypes: string[];
  guitarCounts: number[];
  totalGuitars: number;
  page: number;
  start: number;
  end: number;
}

export type State = RootState;
