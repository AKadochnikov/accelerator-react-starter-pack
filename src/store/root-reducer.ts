import {combineReducers} from '@reduxjs/toolkit';
import dataReducer from './data/data';
import {guitarsApi} from '../services/guitar-api/guitar-api';
import {NameSpace} from '../const';

export const rootReducer = combineReducers({
  [NameSpace.data]: dataReducer,
  [NameSpace.GuitarsApi]: guitarsApi.reducer,
});
