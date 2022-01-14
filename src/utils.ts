import {debounce} from 'ts-debounce';
import {api} from './services/api';
import {APIRoute, guitarsChar, GuitarType, MAX_GUITARS, StringsCount} from './const';
import {Guitar} from './types/types';
import {Dispatch, SetStateAction} from 'react';
import {Params} from './const';

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

const changeCount = (counts: number[], cb: (item: number[]) => void) => {
  cb(counts);
};

const changeType = (types: string[], cb: (item: string[]) => void) => {
  cb(types);
};

export const debouncedChangeType = debounce(changeType, 1000);

export const debouncedChangeCount = debounce(changeCount, 1000);

export const adaptImgPath = (imgPath: string):string => {
  const guitarString = imgPath.slice(4);
  const defaultPath = 'img/content/';
  return defaultPath.concat(guitarString);
};

export const getAvailableTypes = (counts: number[]) => {
  const availableTypes: Set<string> = new Set();
  if (counts.length === 0) {
    availableTypes.add(GuitarType.Acoustic);
    availableTypes.add(GuitarType.Electric);
    availableTypes.add(GuitarType.Ukulele);
    return availableTypes;
  }
  guitarsChar.forEach((item) => {
    item.counts.forEach((count) => {
      if(counts.includes(count)) {
        availableTypes.add(item.type);
        if(availableTypes.size === guitarsChar.length) {
          return availableTypes;
        }
      }
    });
    return availableTypes;
  });
  return availableTypes;
};

export const getAvailableCounts = (types: string[]) => {
  const availableCounts: Set<number> = new Set();
  if (types.length === 0) {
    availableCounts.add(StringsCount.Four);
    availableCounts.add(StringsCount.Six);
    availableCounts.add(StringsCount.Seven);
    availableCounts.add(StringsCount.Twelve);
    return availableCounts;
  }
  guitarsChar.forEach((item) => {
    if(types.includes(item.type)) {
      item.counts.forEach((count) => {
        availableCounts.add(count);
      });
      return availableCounts;
    }
  });
  return availableCounts;
};

export const getPagination = (total: number) => {
  const paginationCounts = Math.ceil(total / 9);
  const paginations = [];
  for(let i = 1; i <= paginationCounts; i++) {
    paginations.push(i);
  }
  return paginations;
};

export const getStartEndParams = (value: number) => {
  const start = (value*MAX_GUITARS)-MAX_GUITARS;
  // eslint-disable-next-line no-console
  console.log(start);
};

export const debouncedValidityPrice = debounce(validityPrice, 1000);

export const debouncedFetchSought = debounce(fetchSought, 1000);
