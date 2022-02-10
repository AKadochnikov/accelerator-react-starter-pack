import { useSearch } from './use-search';
import { useCallback, useEffect, useState } from 'react';
import { Guitar } from '../types/types';
import { api } from '../services/api';
import { APIRoute, FAIL_MESSAGE, LoadingStatus, Params } from '../const';
import { toast } from 'react-toastify';

export const useFetchGuitars = (params: string) => {
  const search = useSearch();
  const [guitars, setGuitars] = useState<Guitar[]>([]);
  const [totalGuitars, setTotalGuitars] = useState<number>(0);
  const [loadStatus, setLoadStatus] = useState<string>(LoadingStatus.Loading);

  if (!search.has(Params.Start) && !search.has(Params.End)) {
    search.set(Params.Start, '0');
    search.set(Params.End, '9');
  }

  const currentSearch = search.toString();
  const execute = useCallback((myRef: {
    unMounted:boolean,
  }) => {
    setLoadStatus(LoadingStatus.Loading);
    api.get<Guitar[]>(`${APIRoute.Guitars}/?_embed=comments&${currentSearch}`)
      .then((response) => {
        if(myRef.unMounted){
          return;
        }
        const data = response.data;
        const header = response.headers;
        setLoadStatus(LoadingStatus.Complete);
        setTotalGuitars(header['x-total-count']);
        setGuitars(data);
      })
      .catch(() => {
        if(myRef.unMounted){
          return;
        }
        setLoadStatus(LoadingStatus.Error);
        toast.info(FAIL_MESSAGE);
      });
  },[currentSearch]);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const myRef = {
      unMounted:false,
    };
    if (!myRef.unMounted) {
      execute(myRef);
    }
    return () => { myRef.unMounted = true; };
  }, [params, execute]);

  return { guitars, totalGuitars, loadStatus };
};
