import {useSearch} from './useSearch';
import {useEffect, useState} from 'react';
import {Guitar} from '../types/types';
import {api} from '../services/api';
import {APIRoute, FAIL_MESSAGE, Params} from '../const';
import {toast} from 'react-toastify';

export const useFetchGuitars = (params: string) => {
  const search = useSearch();
  const [guitars, setGuitars] = useState<Guitar[]>([]);
  const [totalGuitars, setTotalGuitars] = useState<number>(0);

  if (!search.has(Params.Start) && !search.has(Params.End)) {
    search.set(Params.Start, '0');
    search.set(Params.End, '9');
  }

  const execute = () => api.get<Guitar[]>(`${APIRoute.Guitars}/?_embed=comments&${search.toString()}`)
    .then((response) => {
      const data = response.data;
      const header = response.headers;
      setTotalGuitars(header['x-total-count']);
      setGuitars(data);
    })
    .catch(() => {
      toast.info(FAIL_MESSAGE);
    });
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    void execute();
  }, [params]);

  return {guitars, totalGuitars};
};
