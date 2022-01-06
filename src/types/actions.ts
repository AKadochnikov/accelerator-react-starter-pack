import {loadGuitars, changeSortingType, changeSortingValue} from '../store/actions';
import {ThunkAction, ThunkDispatch} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {State} from './state';

export enum ActionType {
  LoadGuitar = 'data/loadGuitars',
  ChangeSortingType = 'user/changeSortingType',
  ChangeSortingValue = 'user/changeSortingValue',
}

export type Actions =
  ReturnType<typeof loadGuitars>
  | ReturnType<typeof changeSortingType>
  | ReturnType<typeof changeSortingValue>;

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;


