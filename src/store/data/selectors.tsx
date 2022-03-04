import {rootState} from '../store';
import {NameSpace} from '../../const';

export const getAddedGuitars = (state: rootState) => state[NameSpace.Data].addedGuitars;
export const getDiscount = (state: rootState) => state[NameSpace.Data].discount;
