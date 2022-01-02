import {debounce} from 'ts-debounce';
import {api} from './services/api';
import {APIRoute} from './const';
import {Guitar} from './types/types';
import {Dispatch, SetStateAction} from 'react';

export const adaptImgPath = (imgPath: string):string => {
  const guitarString = imgPath.slice(4);
  const defaultPath = 'img/content/';
  return defaultPath.concat(guitarString);
};

const fetchSought = (value: string, cb: Dispatch<SetStateAction<Guitar[] | undefined>>) => {
  api.get(APIRoute.Guitars, {params: {'name_like': value}}).then((response) => cb(response.data));
};

export const debouncedFetchSought = debounce(fetchSought, 1500);
