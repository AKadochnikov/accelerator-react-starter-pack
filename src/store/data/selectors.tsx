import {rootState} from '../store';

export const getCartGuitars = (state: rootState) => state.data.cartGuitars;
export const getAddedGuitars = (state: rootState) => state.data.addedGuitars;
