export const BACKEND_URL = 'https://accelerator-guitar-shop-api-v1.glitch.me';
export const REQUEST_TIME_OUT = 10000;

export enum APIRoute {
  Guitars = '/guitars',
}

export enum AppRoute {
  Main = '/',
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
