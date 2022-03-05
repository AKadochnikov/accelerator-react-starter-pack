import {data} from './data';
import {makeFakeAddedGuitars} from '../../mock-guitars';
import {addGuitar, addDiscount} from './actions';

const fakeGuitars = makeFakeAddedGuitars();

describe('Reducer: data', () => {
  it('without additional parameters should return initial state', () => {
    expect(data.reducer(void 0, {type: ''}))
      .toEqual({
        addedGuitars: [],
        discount: 0});
  });

  it('should addGuitar action', () => {
    const state = {
      addedGuitars: [],
      discount: 0,
    };
    expect(data.reducer(state, addGuitar(fakeGuitars)))
      .toEqual({addedGuitars: fakeGuitars, discount: 0});
  });
  it('should addDiscount action', () => {
    const state = {
      addedGuitars: [],
      discount: 0,
    };
    expect(data.reducer(state, addDiscount(15)))
      .toEqual({addedGuitars: [], discount: 15});
  });
});
