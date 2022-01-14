import {NameSpace} from '../../const';
import {State} from '../../types/state';

export const getParams = (state: State) => state[NameSpace.user].params;
export const getIsInit = (state: State) => state[NameSpace.user].isInit;
export const getMinPrice = (state: State) => state[NameSpace.user].minPrice;
export const getMaxPrice = (state: State) => state[NameSpace.user].maxPrice;
export const getPriceLoadStatus = (state: State) => state[NameSpace.user].priceStatus;
export const getGuitarTypes = (state: State) => state[NameSpace.user].guitarTypes;
export const getGuitarCounts = (state: State) => state[NameSpace.user].guitarCounts;
export const getTotalGuitars = (state: State) => state[NameSpace.user].totalGuitars;
export const getStart = (state: State) => state[NameSpace.user].start;
export const getEnd = (state: State) => state[NameSpace.user].end;
export const getPage = (state: State) => state[NameSpace.user].page;
