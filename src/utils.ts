import {debounce} from 'ts-debounce';
import {api} from './services/api';
import {
  APIRoute,
  AppRoute, FAIL_GET_COMMENTS, FAIL_MESSAGE,
  guitarsChar,
  GuitarType, MAX_CART_VALUE,
  MAX_GUITARS, MIN_CART_VALUE,
  Params,
  RussianGuitarType,
  START_PAGE,
  StringsCount, UNDEFINED_GUITAR_TYPE, WAIT_1000_MILLISECONDS, WAIT_500_MILLISECONDS
} from './const';
import {AddedGuitar, Guitar} from './types/types';
import {Dispatch, SetStateAction} from 'react';
import {History} from 'history';
import {Comment} from './types/types';
import {toast} from 'react-toastify';
import {addGuitar} from './store/data/actions';

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
    cb(sortSoughtGuitars(response.data, value));
  });
};

const validityMinPrice = (eventTarget: EventTarget & HTMLInputElement, maxPrice: number, minPrice:number, history: History, search: URLSearchParams, cb:  Dispatch<SetStateAction<number>>, currentMaxPrice: number) => {
  search.set(Params.Start, '0');
  search.set(Params.End, '9');
  if (eventTarget.value !== ''){
    const value = Number(eventTarget.value);
    if(value > maxPrice) {
      cb(maxPrice);
      eventTarget.value = maxPrice.toString();
      search.set(Params.PriceMin, eventTarget.value);
    } else if (value < minPrice) {
      cb(minPrice);
      eventTarget.value = minPrice.toString();
      search.set(Params.PriceMin, eventTarget.value);
    } else if (value > currentMaxPrice && currentMaxPrice !== 0) {
      cb(currentMaxPrice);
      eventTarget.value = currentMaxPrice.toString();
      search.set(Params.PriceMin, eventTarget.value);
    }
    search.set(Params.PriceMin, eventTarget.value);
    history.push(`${AppRoute.Main}page_${START_PAGE}?${search.toString()}`);
    return;
  }
  search.delete(Params.PriceMin);
  history.push(`${AppRoute.Main}page_${START_PAGE}?${search.toString()}`);
};

const validityMaxPrice = (eventTarget: EventTarget & HTMLInputElement, maxPrice: number, minPrice:number, history: History, search: URLSearchParams, cb:  Dispatch<SetStateAction<number>>, currentMinPrice: number) => {
  search.set(Params.Start, '0');
  search.set(Params.End, '9');
  if (eventTarget.value !== ''){
    const value = Number(eventTarget.value);
    if(value > maxPrice) {
      cb(maxPrice);
      eventTarget.value = maxPrice.toString();
      search.set(Params.PriceMax, eventTarget.value);
    } else if (value < currentMinPrice && currentMinPrice < minPrice) {
      cb(minPrice);
      eventTarget.value = minPrice.toString();
      search.set(Params.PriceMax, eventTarget.value);
    } else if (value < currentMinPrice) {
      cb(currentMinPrice);
      eventTarget.value = currentMinPrice.toString();
      search.set(Params.PriceMax, eventTarget.value);
    } else if (value < minPrice) {
      cb(minPrice);
      eventTarget.value = minPrice.toString();
      search.set(Params.PriceMax, eventTarget.value);
    }
    search.set(Params.PriceMax, eventTarget.value);
    history.push(`${AppRoute.Main}page_${START_PAGE}?${search.toString()}`);
    return;
  }
  search.delete(Params.PriceMax);
  history.push(`${AppRoute.Main}page_${START_PAGE}?${search.toString()}`);
};

export const getFilteredCounts = (counts: number[], types: string[]) => {
  const availableCounts = getAvailableCounts(types);
  return counts.filter((item) => availableCounts.has(item));
};

export const getFilteredTypes = (counts: number[], types: string[]) => {
  const availableTypes = getAvailableTypes(counts);
  return types.filter((item) => availableTypes.has(item));
};

const changeCountAndType = (counts: number[], types: string[], history: History, search: URLSearchParams) => {
  search.delete(Params.StringCount);
  search.delete(Params.GuitarType);
  search.set(Params.Start, '0');
  search.set(Params.End, '9');
  if(counts.length !== 0) {
    const filteredCounts = getFilteredCounts(counts, types);
    filteredCounts.forEach((count) => {
      search.append(Params.StringCount, count.toString());
    });
  }
  if(types.length !== 0) {
    const filteredTypes = getFilteredTypes(counts, types);
    filteredTypes.forEach((type) => {
      search.append(Params.GuitarType, type);
    });
  }
  history.push(`${AppRoute.Main}page_${START_PAGE}?${search.toString()}`);
};

export const sortSoughtGuitars = (guitars: Guitar[], value: string) =>
  guitars.sort((a, b) => {
    const nameA = a.name;
    const nameB = b.name;
    const scoreA = getScore(nameA, value);
    const scoreB = getScore(nameB, value);
    return scoreB - scoreA;
  });

const getScore = (name: string, value: string) => {
  let score = 0;
  const currentValue = value.toLowerCase().split('');
  const currentName: Array<string | null> = name.toLowerCase().split('');
  currentValue.forEach((chart) => {
    const index = currentName.indexOf(chart);
    if (index !== -1){
      score = score + 100 - index;
      if(index === 0) {
        currentName.splice(0, 1, null);
      }
      currentName.splice(0, index+1, null);
    }
  });
  return score;
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
  const pagination = [];
  for(let i = 1; i <= paginationCounts; i++) {
    pagination.push(i);
  }
  return pagination;
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

export const getRussianType = (type: string): string => {
  switch (type) {
    case GuitarType.Acoustic: {
      return RussianGuitarType.Acoustic;
    }
    case GuitarType.Electric: {
      return RussianGuitarType.Electric;
    }
    case GuitarType.Ukulele: {
      return RussianGuitarType.Ukulele;
    }
    default: {
      return UNDEFINED_GUITAR_TYPE;
    }
  }
};

export const getActiveComments = (step: number, comments: Comment[], cb: Dispatch<SetStateAction<Comment[]>>) => {
  const sortedComments = comments.slice().sort((commentA: Comment, commentB: Comment) => Date.parse(commentB.createAt) - Date.parse(commentA.createAt));
  if(step >= sortedComments.length) {
    cb(sortedComments);
  }
  sortedComments.splice(step);
  cb(sortedComments);
};

export const postComment = (id: number, name: string, advantage: string, disadvantage: string, comment: string, rating: number, disableForm:  Dispatch<SetStateAction<boolean>>, disableSubmit: Dispatch<SetStateAction<boolean>>, setIsOpenedCommentModal: Dispatch<SetStateAction<boolean>>, setIsOpenedSuccessModal: Dispatch<SetStateAction<boolean>>) => {
  disableForm(true);
  disableSubmit(true);
  api.post(APIRoute.Comments, {
    guitarId: id,
    userName: name,
    advantage: advantage,
    disadvantage: disadvantage,
    comment: comment,
    rating: rating,
  })
    .then(() => {
      setIsOpenedCommentModal(false);
      setIsOpenedSuccessModal(true);
    })
    .catch(() => {
      disableForm(false);
      disableSubmit(false);
      toast.info(FAIL_MESSAGE);
    });
};

export const getComments = (id: number, cb: Dispatch<SetStateAction<Comment[]>>) => {
  api.get(`${APIRoute.Guitars}/${id}/comments`)
    .then((response) => cb(response.data))
    .catch(() => {
      toast.info(FAIL_GET_COMMENTS);
    });
};

export const getCurrentGuitars = (allGuitars: Guitar[], addedGuitars: AddedGuitar[]) => {
  const cartGuitars: Guitar[] = [];
  addedGuitars.forEach((item) => {
    const index = allGuitars.findIndex((allGuitarItem) => allGuitarItem.id === item.id);
    const cartGuitar = {...allGuitars[index], count: item.count};
    cartGuitars.push(cartGuitar);
  });
  return cartGuitars;
};

export const getUpdatedGuitars = (addedGuitars: AddedGuitar[], id: number, value: number) => addedGuitars.map((item) => {
  if (item.id === id) {
    return {...item, count: value};
  }
  return item;
});

export const updateCount = (value: number | '', dispatch: Dispatch<{ payload: AddedGuitar[]; type: string; }>, addedGuitars: AddedGuitar[], id: number, setCurrentCount: Dispatch<SetStateAction<number | ''>>, setIsOpenedModal: Dispatch<SetStateAction<boolean>>) => {
  if (value === 0 || value === '') {
    setIsOpenedModal(true);
    setCurrentCount(1);
    const updatedGuitars = getUpdatedGuitars(addedGuitars, id, MIN_CART_VALUE);
    dispatch(addGuitar(updatedGuitars));
    return;
  }
  let currentValue = value;
  if (currentValue > MAX_CART_VALUE) {
    setCurrentCount(MAX_CART_VALUE);
    currentValue = MAX_CART_VALUE;
  }
  const updatedGuitars = getUpdatedGuitars(addedGuitars, id, currentValue);
  dispatch(addGuitar(updatedGuitars));
};

export const getCount = (addedGuitars: AddedGuitar[]) => {
  const addedCount = addedGuitars.map((item) => item.count);
  return addedCount.reduce((itemA, itemB) => itemA + itemB);
};

export const humanizeDate = (date: Date): string => date.toLocaleDateString('ru-Ru', {day: '2-digit', month: 'long'});

export const debouncedChangeCountAndType = debounce(changeCountAndType, WAIT_1000_MILLISECONDS);

export const debouncedValidityMinPrice = debounce(validityMinPrice, WAIT_500_MILLISECONDS);
export const debouncedValidityMaxPrice = debounce(validityMaxPrice, WAIT_500_MILLISECONDS);

export const debouncedFetchSought = debounce(fetchSought, WAIT_1000_MILLISECONDS);
