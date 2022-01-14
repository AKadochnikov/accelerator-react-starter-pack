export const BACKEND_URL = 'https://accelerator-guitar-shop-api-v1.glitch.me';
export const REQUEST_TIME_OUT = 10000;
export const MAX_GUITARS = 9;

export enum APIRoute {
  Guitars = '/guitars',
}

export enum AppRoute {
  Main = '/',
  Catalog ='/page_:id',
  Guitar = '/guitars/:id'
}

export enum NameSpace {
  data = 'DATA',
  user = 'USER',
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
  Page = 'page'
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

export enum PriceLoadStatus {
  NotLoaded = 'notLoaded',
  Loaded = 'loaded',
  Ready = 'ready',
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

