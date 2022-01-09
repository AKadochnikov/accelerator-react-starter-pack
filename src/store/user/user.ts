import {User} from '../../types/state';
import {Actions, ActionType} from '../../types/actions';

const initialState = {
  params: '',
  isInit: false,
};

export const user = (state: User = initialState, action: Actions): User => {
  switch (action.type){
    case ActionType.ChangeParams: {
      const {params} = action.payload;
      return {...state,
        params: params,
      };
    }
    case ActionType.InitParams: {
      const {params} = action.payload;
      return {...state,
        params: params,
        isInit: true,
      };
    }
    default: return state;
  }
};
