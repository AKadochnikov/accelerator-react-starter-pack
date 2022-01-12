import {User} from '../../types/state';
import {Actions, ActionType} from '../../types/actions';
import {PriceLoadStatus} from '../../const';

const initialState = {
  params: '',
  isInit: false,
  minPrice: 0,
  maxPrice: 0,
  priceStatus: PriceLoadStatus.NotLoaded,
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
    case ActionType.ChangeMinPrice: {
      const {value} = action.payload;
      return {...state,
        minPrice: value,
      };
    }
    case ActionType.ChangeMaxPrice: {
      const {value} = action.payload;
      return {...state,
        maxPrice: value,
      };
    }

    case ActionType.ChangeLoadStatus: {
      const {value} = action.payload;
      return {...state,
        priceStatus: value};
    }

    default: return state;
  }
};
