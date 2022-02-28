import {configureStore} from '@reduxjs/toolkit';
import {guitarsApi} from '../services/guitar-api/guitar-api';
import {rootReducer} from './root-reducer';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(guitarsApi.middleware),
});

export type rootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;
