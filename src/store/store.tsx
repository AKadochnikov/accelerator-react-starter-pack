import {configureStore} from '@reduxjs/toolkit';
import dataReducer from './data/data';

export const store = configureStore({
  reducer: {
    data: dataReducer,
  },
});

export type rootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
