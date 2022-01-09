import {debounce} from 'ts-debounce';
import {api} from './services/api';
import {APIRoute} from './const';
import {Guitar} from './types/types';
import {Dispatch, SetStateAction} from 'react';
import {Params} from './const';

export const adaptImgPath = (imgPath: string):string => {
  const guitarString = imgPath.slice(4);
  const defaultPath = 'img/content/';
  return defaultPath.concat(guitarString);
};

const fetchSought = (value: string, cb: Dispatch<SetStateAction<Guitar[] | undefined>>) => {
  if(value.length === 0) {
    cb(undefined);
    return;
  }
  api.get(APIRoute.Guitars, {params: {[Params.NameLike]: value}}).then((response) => {
    if(response.data.length === 0) {
      cb(undefined);
      return;
    }
    cb(response.data);
  });
};

const validityMinPrice = (eventTarget: EventTarget & HTMLInputElement, minPrice: number, cb: Dispatch<SetStateAction<string>>) => {
  if (eventTarget.value !== ''){
    const value = Number(eventTarget.value);
    if(value < 1000) {
      eventTarget.value = '1000';
      cb(eventTarget.value);
    }
  }
  cb(eventTarget.value);
};

export const debouncedValidityMinPrice = debounce(validityMinPrice, 1000);

export const debouncedFetchSought = debounce(fetchSought, 1000);
