import {useCallback, useEffect} from 'react';
import {APIRoute} from '../../const';
import {useSearch} from '../use-search/use-search';
import {Guitar} from '../../types/types';
import {api} from '../../services/api';
import {Params} from '../../const';
import {useState} from 'react';

export const useMinMaxPrice = (params: string) => {
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const search = useSearch();
  search.delete(Params.PriceMin);
  search.delete(Params.PriceMax);
  search.delete(Params.Start);
  search.delete(Params.End);

  const searchParams = search.toString();

  const execute = useCallback((myRef: { unMounted: boolean }) => {
    api.get<Guitar[]>(`${APIRoute.Guitars}/?${searchParams}`)
      .then((response) => {
        const data = response.data;
        const value = data.map((item) => item.price);
        if (!myRef.unMounted) {
          setMinPrice(Math.min(...value));
          setMaxPrice(Math.max(...value));
        }
      });}, [searchParams]);

  useEffect(() => {
    const myRef = {
      unMounted: false,
    };
    if (!myRef.unMounted) {
      execute(myRef);
    }
    return () => { myRef.unMounted = true; };
  }, [execute, params]);

  return [minPrice, maxPrice];
};
