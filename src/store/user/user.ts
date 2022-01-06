import {User} from '../../types/state';
import {Actions, ActionType} from '../../types/actions';

const initialState = {
  sortingType: undefined,
  sortingValue: undefined,
};

export const user = (state: User = initialState, action: Actions): User => {
  switch (action.type){
    case ActionType.ChangeSortingType: {
      const {sortingType} = action.payload;
      return {...state,
        sortingType: sortingType,
      };
    }
    case ActionType.ChangeSortingValue: {
      const {sortingValue} = action.payload;
      return {...state,
        sortingValue: sortingValue,
      };
    }
    default: return state;
  }
};
