import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {APIRoute, BACKEND_URL, NameSpace} from '../../const';

export const guitarsApi = createApi({
  reducerPath: NameSpace.GuitarsApi,
  baseQuery: fetchBaseQuery({baseUrl: BACKEND_URL}),
  endpoints: (builder) => ({
    getGuitars: builder.query({
      query: () => ({
        url: APIRoute.Guitars,
      }),
    }),
  }),
});

export const {useGetGuitarsQuery} = guitarsApi;

