import {configureMockStore} from '@jedmao/redux-mock-store';
import {NameSpace} from './const';
import MockAdapter from 'axios-mock-adapter';
import {api} from './services/api';
import thunk from 'redux-thunk';
import {rootState} from './store/store';
import {Action, ThunkDispatch} from '@reduxjs/toolkit';

const mockAPI = new MockAdapter(api);
const middlewares = [thunk.withExtraArgument(mockAPI)];
const mockStore = configureMockStore<rootState, Action, ThunkDispatch<rootState, typeof api, Action>>(middlewares);
export const store = mockStore({
  [NameSpace.Data]: {
    addedGuitars: [],
    discount: 0,
  },
  [NameSpace.CouponApi]: {},
  [NameSpace.GuitarsApi]: {},
});
