export const BACKEND_URL = 'https://accelerator-guitar-shop-api-v1.glitch.me';
export const REQUEST_TIME_OUT = 10000;
export const MAX_GUITARS = 9;
export const START_PAGE = 1;
export const FAIL_MESSAGE = 'Извините, сервер недоступен';
export const COMMENT_STEP = 3;
export const FAIL_GET_COMMENTS = 'Извините, сервер недоступен. Обновите пожалуйста страницу.';

export const isCatalog = {
  yes: true,
  no: false,
};

export enum Key {
  Escape = 'Escape',
  Esc = 'Esc',
  Enter = 'Enter',
}

export enum LoadingStatus {
  Loading = 'loading',
  Complete = 'complete',
  Error = 'error',
}

export enum APIRoute {
  Guitars = '/guitars',
  Comments = '/comments'

}

export enum AppRoute {
  Main = '/',
  Catalog ='/page_:id',
  Guitar = '/guitars/:id',
  CurrentGuitar = '/guitars/',
  Cart = '/cart'
}

export enum NameSpace {
  data = 'DATA',
  user = 'USER',
}

export enum Tabs {
  Specifications = 'specifications',
  Description = 'description',
}

export enum Params {
  NameLike = 'name_like',
  Start = '_start',
  End = '_end',
  Sort = '_sort',
  Order = '_order',
  StringCount = 'stringCount',
  PriceMin = 'price_gte',
  PriceMax = 'price_lte',
  GuitarType = 'type',
}

export enum SortingParams {
  Price = 'price',
  Rating = 'rating',
  Asc = 'asc',
  Desc = 'desc',
}

export enum StringsCount {
  Four = 4,
  Six = 6,
  Seven = 7,
  Twelve = 12,
}

export enum GuitarType {
  Acoustic = 'acoustic',
  Electric = 'electric',
  Ukulele = 'ukulele',
}

export enum RussianGuitarType {
  Acoustic = 'Акустическая',
  Electric = 'Электронная',
  Ukulele = 'Акулеле',
}

export const guitarsChar = [
  {
    type: GuitarType.Acoustic,
    counts: [StringsCount.Six, StringsCount.Seven, StringsCount.Twelve],
  },
  {
    type: GuitarType.Electric,
    counts: [StringsCount.Four, StringsCount.Six, StringsCount.Seven],
  },
  {
    type: GuitarType.Ukulele,
    counts: [StringsCount.Four],
  },
];

