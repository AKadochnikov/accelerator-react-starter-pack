import {rootState} from '../store';
import {NameSpace} from '../../const';

export const getAddedGuitars = (state: rootState) => state[NameSpace.Data].addedGuitars;
