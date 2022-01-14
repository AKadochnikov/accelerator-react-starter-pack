import {loadGuitars, changeParams, initLoadParams, changeMinPrice, changeMaxPrice, changeLoadPriceStatus, changeGuitarTypes, changeGuitarCounts, changeTotalGuitars} from '../store/actions';
import {ThunkAction, ThunkDispatch} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {State} from './state';

export enum ActionType {
  LoadGuitar = 'data/loadGuitars',
  ChangeParams = 'user/changeParams',
  InitParams = 'user/initParams',
  ChangeMinPrice = 'user/changeMinPrice',
  ChangeMaxPrice = 'user/changeMaxPrice',
  ChangeLoadStatus = 'user/changeLoadStatus',
  ChangeGuitarTypes = 'user/changeGuitarTypes',
  ChangeGuitarCounts = 'user/changeGuitarCounts',
  ChangeTotalGuitars = 'user/changeTotalGuitars'
}

export type Actions =
  ReturnType<typeof loadGuitars>
  | ReturnType<typeof changeParams>
  | ReturnType<typeof initLoadParams>
  | ReturnType<typeof changeMinPrice>
  | ReturnType<typeof changeMaxPrice>
  | ReturnType<typeof changeLoadPriceStatus>
  | ReturnType<typeof changeGuitarTypes>
  | ReturnType<typeof changeGuitarCounts>
  | ReturnType<typeof changeTotalGuitars>;

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;


