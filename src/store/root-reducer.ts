import {combineReducers} from '@reduxjs/toolkit';
import {data} from './data/data';
import {user} from './user/user';
import {NameSpace} from '../const';

export const rootReducer = combineReducers({
  [NameSpace.data]: data,
  [NameSpace.user]: user,
});

export type RootState = ReturnType<typeof rootReducer>;
