import MockAdapter from 'axios-mock-adapter';
import {api} from '../services/api';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {State} from '../types/state';
import {Action} from '@reduxjs/toolkit';
import {APIRoute, PriceLoadStatus} from '../const';
import {makeFakeGuitars} from '../mock';
import {fetchAllGuitarsAction, fetchGuitarsAction} from './api-actions';
import {changeLoadPriceStatus, changeMaxPrice, changeMinPrice, changeTotalGuitars, loadGuitars} from './actions';

describe('Async actions', () => {
  const mockApi = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('should load Guitars and change totalGuitars if params !== undefined', async () => {
    const fakeParams = '_start=0&_end=9';
    const mockGuitars = makeFakeGuitars();
    const fakeHeaders = {
      'x-total-count': '10',
    };
    mockApi
      .onGet(`${APIRoute.Guitars}/?_embed=comments&${fakeParams}`)
      .reply(200, mockGuitars,  fakeHeaders);

    const store = mockStore();
    await store.dispatch(fetchGuitarsAction(fakeParams));

    expect(store.getActions()).toEqual([
      changeTotalGuitars(Number(fakeHeaders['x-total-count'])),
      loadGuitars(mockGuitars),
    ]);
  });

  it('should change minPrice and maxPrice',  async () => {
    const fakeParams = '';
    const mockGuitars = makeFakeGuitars();
    const value = mockGuitars.map((item) => item.price);
    const minPrice = Math.min(...value);
    const maxPrice = Math.max(...value);
    mockApi
      .onGet(`${APIRoute.Guitars}/?${fakeParams}`)
      .reply(200, mockGuitars);
    const store = mockStore();
    await store.dispatch(fetchAllGuitarsAction(fakeParams, PriceLoadStatus.NotLoaded));

    expect(store.getActions()).toEqual([
      changeMinPrice(minPrice),
      changeMaxPrice(maxPrice),
      changeLoadPriceStatus(PriceLoadStatus.Loaded),
    ]);
  });

  it('should change LoadPriceStatus if get error', async () => {
    const fakeParams = '';
    mockApi
      .onGet(`${APIRoute.Guitars}/?${fakeParams}`)
      .reply(400);

    const store = mockStore();
    await store.dispatch(fetchAllGuitarsAction(fakeParams, PriceLoadStatus.Loaded));

    expect(store.getActions()).toEqual([
      changeLoadPriceStatus(PriceLoadStatus.NotLoaded),
    ]);
  });

  it('should change minPrice and  maxPrice but PriceLoadStatus not changed',  async () => {
    const fakeParams = '';
    const mockGuitars = makeFakeGuitars();
    const value = mockGuitars.map((item) => item.price);
    const minPrice = Math.min(...value);
    const maxPrice = Math.max(...value);
    mockApi
      .onGet(`${APIRoute.Guitars}/?${fakeParams}`)
      .reply(200, mockGuitars);
    const store = mockStore();
    await store.dispatch(fetchAllGuitarsAction(fakeParams, PriceLoadStatus.Ready));

    expect(store.getActions()).toEqual([
      changeMinPrice(minPrice),
      changeMaxPrice(maxPrice),
    ]);
  });

});
