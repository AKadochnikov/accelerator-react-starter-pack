import {loadGuitars, changeParams, initLoadParams} from '../store/actions';
import {ThunkAction, ThunkDispatch} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {State} from './state';

export enum ActionType {
  LoadGuitar = 'data/loadGuitars',
  ChangeParams = 'user/ChangeParams',
  InitParams = 'user/InitParams'
}

export type Actions =
  ReturnType<typeof loadGuitars>
  | ReturnType<typeof changeParams>
  | ReturnType<typeof initLoadParams>;

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;


