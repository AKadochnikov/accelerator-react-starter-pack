import {debounce} from 'ts-debounce';
import {api} from './services/api';
import {APIRoute, guitarsChar, GuitarType, MAX_GUITARS, START_PAGE, StringsCount} from './const';
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

const changePageStartEnd = (changePage: (value: number) => void, changeParams: (value: string) => void, params: string, page: number) => {
  const search = new URLSearchParams(params);
  search.set(Params.Start, '0');
  search.set(Params.End, '9');
  if(page !== START_PAGE) {
    changePage(START_PAGE);
  }
  changeParams(search.toString());
};

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
  const paginationCounts = Math.ceil(total / MAX_GUITARS);
  const paginations = [];
  for(let i = 1; i <= paginationCounts; i++) {
    paginations.push(i);
  }
  return paginations;
};

export const getStartEndParams = (value: number, totalGuitars: number) => {
  const maxPages = Math.ceil(totalGuitars / MAX_GUITARS);
  const newParams = {
    start: 0,
    end: 0,
  };

  if(maxPages === value) {
    newParams.start = ((value-1)*MAX_GUITARS);
    newParams.end = totalGuitars;
    return newParams;
  }
  newParams.end = (value*MAX_GUITARS);
  newParams.start = newParams.end-MAX_GUITARS;
  return newParams;
};

export const changePaginationPageStartEnd = (value: number, totalGuitars: number, onChangePage: (value: number) => void, onChangeParams: (newParams: string) => void, params: string) => {
  const newParams = getStartEndParams(value, totalGuitars);
  onChangePage(value);
  const search = new URLSearchParams(params);
  search.set(Params.Start, newParams.start.toString());
  search.set(Params.End, newParams.end.toString());
  onChangeParams(search.toString());
};

export const debouncedChangePageStartEnd = debounce(changePageStartEnd, 1000);

export const debouncedChangeType = debounce(changeType, 1000);

export const debouncedChangeCount = debounce(changeCount, 1000);

export const debouncedValidityPrice = debounce(validityPrice, 1000);

export const debouncedFetchSought = debounce(fetchSought, 1000);
