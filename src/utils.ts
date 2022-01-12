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

const validityPrice = (eventTarget: EventTarget & HTMLInputElement, maxPrice: number, minPrice:number, cb: Dispatch<SetStateAction<string | null>>, currentPrice: number) => {
  if (eventTarget.value !== ''){
    const value = Number(eventTarget.value);
    if(value > maxPrice) {
      eventTarget.value = maxPrice.toString();
      cb(eventTarget.value);
    } else if (value < minPrice) {
      eventTarget.value = minPrice.toString();
      cb(eventTarget.value);
    }
    cb(eventTarget.value);
    return;
  }
  cb(currentPrice.toString());
};

export const debouncedValidityPrice = debounce(validityPrice, 1000);

export const debouncedFetchSought = debounce(fetchSought, 1000);
