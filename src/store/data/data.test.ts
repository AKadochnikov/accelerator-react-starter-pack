import {data} from './data';
import {makeFakeGuitars} from '../../mock';
import {loadGuitars} from '../actions';

const fakeGuitars = makeFakeGuitars();

describe('Reducer: data', () => {
  it('without additional parameters should return initial state', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(data(void 0, {type: ''}))
      .toEqual({
        guitars: [],
        isDataLoaded: false});
  });

  it('should load guitars and change isDataLoaded', () => {
    const state = {
      guitars: [],
      isDataLoaded: false,
    };
    expect(data(state, loadGuitars(fakeGuitars)))
      .toEqual({guitars: fakeGuitars, isDataLoaded: true});
  });
});
