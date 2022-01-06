import {NameSpace} from '../../const';
import {State} from '../../types/state';

export const getSortingType = (state: State) => state[NameSpace.user].sortingType;
export const getSortingOrder = (state: State) => state[NameSpace.user].sortingOrder;
