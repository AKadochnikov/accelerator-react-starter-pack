import {combineReducers} from '@reduxjs/toolkit';
import {data} from './data/data';
import {NameSpace} from '../const';

export const rootReducer = combineReducers({
  [NameSpace.data]: data,
});

export type RootState = ReturnType<typeof rootReducer>;
