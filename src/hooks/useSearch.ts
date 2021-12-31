import {useEffect, useReducer} from 'react';
import {api} from '../services/api';
import {APIRoute} from '../const';
import {debounce} from 'ts-debounce';

interface State<T> {
  data?: T
}

type Action<T> =
  | { type: 'fetched'; payload: T | undefined }

export const useSearch = <T = unknown>(search: string): State<T> => {

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

  const fetchData = async () => api.get(APIRoute.Guitars, {params: {'name_like': search}})
    .then((response) => dispatch({type: 'fetched', payload: response.data}));

  const debouncedFetch = debounce(fetchData, 2000);

  useEffect(() => {
    if (search === '') {
      dispatch({type: 'fetched', payload: undefined});
    }

    void debouncedFetch();

  }, [search]);

  return state;
};
