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
}

export enum Params {
  NameLike = 'name_like',
  Start = '_start',
  End = '_end',
  Sort = '_sort',
  Order = '_order',
}

export enum SortingParams {
  Price = 'price',
  Rating = 'rating',
  Asc = 'asc',
  Desc = 'desc',
}
