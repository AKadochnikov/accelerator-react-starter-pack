import {Data} from '../../types/state';
import {Actions, ActionType} from '../../types/actions';

const initialState = {
  guitars: [],
  isDataLoaded: false,
};

export const data = (state: Data = initialState, action: Actions) : Data => {
  switch (action.type) {
    case ActionType.LoadGuitar: {
      const {guitars} = action.payload;
      return {...state,
        guitars: guitars,
        isDataLoaded: true,
      };
    }
    default:
      return state;
  }
};
