import MockAdapter from 'axios-mock-adapter';
import {api} from './services/api';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {State} from './types/state';
import {Action} from '@reduxjs/toolkit';
import {NameSpace, PriceLoadStatus} from './const';
import {createMemoryHistory} from 'history';

export const mockAPI = new MockAdapter(api);
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State, Action, ThunkDispatch<State, typeof api, Action>>(middlewares);

export const store = mockStore({
  [NameSpace.user]: {
    params: '',
    isInit: false,
    minPrice: 0,
    maxPrice: 0,
    priceStatus: PriceLoadStatus.NotLoaded,
    guitarTypes: [],
    guitarCounts: [],
    totalGuitars: 0,
    page: 1,
    start: 0,
    end: 9,
  },
  [NameSpace.data]: {
    guitars: [],
    isDataLoaded: false,
  },
});

export const history = createMemoryHistory();
