import {rootState} from '../store';

export const getCartGuitars = (state: rootState) => state.data.cartGuitars;
export const getGuitarsId = (state: rootState) => state.data.guitarsId;
