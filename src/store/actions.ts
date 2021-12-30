import {ActionType} from '../types/actions';
import {Guitar} from '../types/types';

export const loadGuitars = (guitars: Guitar[]) => ({
  type: ActionType.LoadGuitar,
  payload: {
    guitars,
  },
});
