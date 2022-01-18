import {debounce} from 'ts-debounce';
import {api} from './services/api';
import {APIRoute, AppRoute, guitarsChar, GuitarType, MAX_GUITARS, START_PAGE, StringsCount} from './const';
import {Guitar} from './types/types';
import {Dispatch, SetStateAction} from 'react';
import {Params} from './const';
import {History} from 'history';

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

const validityMinPrice = (eventTarget: EventTarget & HTMLInputElement, maxPrice: number, minPrice:number, history: History, search: URLSearchParams, id: number) => {
  search.set(Params.Start, '0');
  search.set(Params.End, '9');
  if (eventTarget.value !== ''){
    const value = Number(eventTarget.value);
    if(value > maxPrice) {
      eventTarget.value = maxPrice.toString();
      search.set(Params.PriceMin, eventTarget.value);
    } else if (value < minPrice) {
      eventTarget.value = minPrice.toString();
      search.set(Params.PriceMin, eventTarget.value);
    }
    search.set(Params.PriceMin, eventTarget.value);
    history.push(`${AppRoute.Main}page_${START_PAGE}?${search.toString()}`);
    return;
  }
  search.set(Params.PriceMin, minPrice.toString());
  history.push(`${AppRoute.Main}page_${START_PAGE}?${search.toString()}`);
};

const validityMaxPrice = (eventTarget: EventTarget & HTMLInputElement, maxPrice: number, minPrice:number, history: History, search: URLSearchParams, id: number) => {
  search.set(Params.Start, '0');
  search.set(Params.End, '9');
  if (eventTarget.value !== ''){
    const value = Number(eventTarget.value);
    if(value > maxPrice) {
      eventTarget.value = maxPrice.toString();
      search.set(Params.PriceMax, eventTarget.value);
    } else if (value < minPrice) {
      eventTarget.value = minPrice.toString();
      search.set(Params.PriceMax, eventTarget.value);
    }
    search.set(Params.PriceMax, eventTarget.value);
    history.push(`${AppRoute.Main}page_${START_PAGE}?${search.toString()}`);
    return;
  }
  search.set(Params.PriceMax, maxPrice.toString());
  history.push(`${AppRoute.Main}page_${START_PAGE}?${search.toString()}`);
};

const changeCountAndType = (counts: number[], types: string[], history: History, search: URLSearchParams) => {
  search.delete(Params.StringCount);
  search.delete(Params.GuitarType);
  search.set(Params.Start, '0');
  search.set(Params.End, '9');
  if(counts.length !== 0) {
    counts.forEach((count) => {
      search.append(Params.StringCount, count.toString());
    });
  }
  if(types.length !== 0) {
    types.forEach((type) => {
      search.append(Params.GuitarType, type);
    });
  }
  history.push(`${AppRoute.Main}page_${START_PAGE}?${search.toString()}`);
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

export const changePage = (value: number, total: number, history: History, search: URLSearchParams) => {
  const startEndParams = getStartEndParams(value, total);
  search.set(Params.Start, startEndParams.start.toString());
  search.set(Params.End, startEndParams.end.toString());
  history.push(`${AppRoute.Main}page_${value}?${search.toString()}`);
};

export const checkId = (id: string) => {
  if(id === undefined) {
    return START_PAGE;
  }
  return Number(id);
};

export const debouncedChangeCountAndType = debounce(changeCountAndType, 1000);

export const debouncedValidityMinPrice = debounce(validityMinPrice, 1000);
export const debouncedValidityMaxPrice = debounce(validityMaxPrice, 1000);

export const debouncedFetchSought = debounce(fetchSought, 1000);
