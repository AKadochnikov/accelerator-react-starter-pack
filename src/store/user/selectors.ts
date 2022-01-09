import {NameSpace} from '../../const';
import {State} from '../../types/state';

export const getParams = (state: State) => state[NameSpace.user].params;
export const getIsInit = (state: State) => state[NameSpace.user].isInit;
export const getMinPrice = (state: State) => state[NameSpace.user].minPrice;
export const getMaxPrice = (state: State) => state[NameSpace.user].maxPrice;
