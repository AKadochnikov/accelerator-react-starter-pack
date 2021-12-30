import {Guitar} from '../../types/types';
import {State} from '../../types/state';
import {NameSpace} from '../../const';

export const getGuitars = (state: State): Guitar[] => state[NameSpace.data].guitars;
