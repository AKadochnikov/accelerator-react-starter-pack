import {rootState} from '../store';
import {NameSpace} from '../../const';

export const getCartGuitars = (state: rootState) => state[NameSpace.data].cartGuitars;
export const getAddedGuitars = (state: rootState) => state[NameSpace.data].addedGuitars;
