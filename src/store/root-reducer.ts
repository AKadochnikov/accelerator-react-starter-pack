import {combineReducers} from '@reduxjs/toolkit';
import dataReducer from './data/data';
import {guitarsApi} from '../services/guitar-api/guitar-api';
import {NameSpace} from '../const';
import {couponApi} from '../services/coupon-api/coupon-api';

export const rootReducer = combineReducers({
  [NameSpace.Data]: dataReducer,
  [NameSpace.GuitarsApi]: guitarsApi.reducer,
  [NameSpace.CouponApi]: couponApi.reducer,
});
