import {User} from '../../types/state';
import {Actions, ActionType} from '../../types/actions';

const initialState = {
  sortingType: '',
  sortingOrder: '',
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
      const {sortingOrder} = action.payload;
      return {...state,
        sortingOrder: sortingOrder,
      };
    }
    default: return state;
  }
};
