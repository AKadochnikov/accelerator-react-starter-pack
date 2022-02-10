import { useCallback, useEffect, useState } from 'react';
import { Guitar } from '../types/types';
import { api } from '../services/api';
import { APIRoute, FAIL_MESSAGE, LoadingStatus } from '../const';
import { toast } from 'react-toastify';

export const useFetchGuitar = (id: string) => {
  const [guitar, setGuitar] = useState<Guitar | null>(null);
  const [loadStatus, setLoadStatus] = useState<string>(LoadingStatus.Loading);
  const execute = useCallback((myRef: { unMounted: boolean }) => {
    setLoadStatus(LoadingStatus.Loading);
    api.get<Guitar>(`${APIRoute.Guitars}/${id}?_embed=comments`)
      .then((response) => {
        const data = response.data;
        if (!myRef.unMounted) {
          setGuitar(data);
          setLoadStatus(LoadingStatus.Complete);
        }
      })
      .catch(() => {
        if (!myRef.unMounted) {
          setLoadStatus(LoadingStatus.Error);
          toast.info(FAIL_MESSAGE);
        }
      });
  }, [id]);
  useEffect(() => {
    const myRef = {
      unMounted: false,
    };
    if (!myRef.unMounted) {
      execute(myRef);
    }
    return () => { myRef.unMounted = true; };
  }, [execute]);
  return { guitar, loadStatus };
};
