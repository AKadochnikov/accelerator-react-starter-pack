import {useEffect} from 'react';
import {APIRoute, FAIL_MESSAGE} from '../const';
import {useSearch} from './useSearch';
import {Guitar} from '../types/types';
import {api} from '../services/api';
import {Params} from '../const';
import {useState} from 'react';
import {toast} from 'react-toastify';

export const useMinMaxPrice = () => {
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const search = useSearch();
  search.delete(Params.PriceMin);
  search.delete(Params.PriceMax);
  search.delete(Params.Start);
  search.delete(Params.End);

  const execute = () => api.get<Guitar[]>(`${APIRoute.Guitars}/?${search.toString()}`)
    .then((response) => {
      const data = response.data;
      const value = data.map((item) => item.price);
      setMinPrice(Math.min(...value));
      setMaxPrice(Math.max(...value));
    })
    .catch((error) => {
      toast.info(FAIL_MESSAGE);
    });

  useEffect(() => {
    void execute();
  }, [search]);

  return [minPrice, maxPrice];
};
