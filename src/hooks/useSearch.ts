import {useEffect, useReducer, useRef} from 'react';
import {api} from '../services/api';
import {APIRoute} from '../const';

interface State<T> {
  data?: T
}

type Action<T> =
  | { type: 'fetched'; payload: T }

export const useSearch = <T = unknown>(search: string): State<T> => {
  const cancelRequest = useRef<boolean>(false);

  const initialState: State<T> = {
    data: undefined,
  };

  const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
      case 'fetched':
        return { ...initialState, data: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {

    const fetchData =  () => api.get(APIRoute.Guitars, {
      params: {
        'name_like': search,
      },
    })
      .then((response) => dispatch({type: 'fetched', payload: response.data}));

    void fetchData();

    return () => {
      cancelRequest.current = true;
    };

  }, [search]);

  return state;
};
