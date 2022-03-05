import {configureMockStore} from '@jedmao/redux-mock-store';
import {NameSpace} from './const';

const mockStore = configureMockStore();
export const store = mockStore({
  [NameSpace.Data]: {
    addedGuitars: [],
    discount: 0,
  },
});
