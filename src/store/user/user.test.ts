import {user} from './user';
import {Params, PriceLoadStatus} from '../../const';
import {
  changeGuitarCounts,
  changeGuitarTypes,
  changeLoadPriceStatus,
  changeMaxPrice,
  changeMinPrice, changePage,
  changeParams, changeTotalGuitars,
  initLoadParams
} from '../actions';

describe('Reducer: user', () => {
  const state = {
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
  };

  it('without additional parameters should return initial state', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(user(void 0, {type: 'UNKNOWN ACTION'}))
      .toEqual(state);
  });

  it('should change params', () => {
    expect(user(state, changeParams(Params.Start)))
      .toEqual({
        ...state,
        params: Params.Start,
      });
  });

  it('should init params and change isInit for true', () => {
    expect(user(state, initLoadParams(Params.Start)))
      .toEqual({
        ...state,
        params: Params.Start,
        isInit: true,
      });
  });

  it('should change minPrice',  () => {
    const testValue = 9;
    expect(user(state, changeMinPrice(testValue)))
      .toEqual({
        ...state,
        minPrice: testValue,
      });
  });

  it('should change maxPrice',  () => {
    const testValue = 29;
    expect(user(state, changeMaxPrice(testValue)))
      .toEqual({
        ...state,
        maxPrice: testValue,
      });
  });

  it('should change priceStatus',  () => {
    expect(user(state, changeLoadPriceStatus(PriceLoadStatus.Loaded)))
      .toEqual({
        ...state,
        priceStatus: PriceLoadStatus.Loaded,
      });
  });

  it('should change guitarTypes',  () => {
    const fakeGuitarTypes = ['electric', 'acoustic'];
    expect(user(state, changeGuitarTypes(fakeGuitarTypes)))
      .toEqual({
        ...state,
        guitarTypes: fakeGuitarTypes,
      });
  });

  it('should change guitarCounts',  () => {
    const fakeGuitarCounts = [4, 6, 7];
    expect(user(state, changeGuitarCounts(fakeGuitarCounts)))
      .toEqual({
        ...state,
        guitarCounts: fakeGuitarCounts,
      });
  });

  it('should change totalGuitars',  () => {
    const fakeValue = 20;
    expect(user(state, changeTotalGuitars(fakeValue)))
      .toEqual({
        ...state,
        totalGuitars: fakeValue,
      });
  });

  it('should change page', () => {
    const fakeValue = 4;
    expect(user(state, changePage(fakeValue)))
      .toEqual({
        ...state,
        page: fakeValue,
      });
  });

});
