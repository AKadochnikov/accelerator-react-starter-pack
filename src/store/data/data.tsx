import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Guitar} from '../../types/types';
import {NameSpace} from '../../const';

export interface dataState {
  cartGuitars: Guitar[];
  guitarsId: number[];
}

const initialState: dataState = {
  cartGuitars: [],
  guitarsId: [],
};

export const data = createSlice({
  name: NameSpace.data,
  initialState,
  reducers: {
    addCartGuitars: (state, action: PayloadAction<Guitar[]>) => {
      state.cartGuitars = action.payload;
    },
    addGuitarsId: (state, action: PayloadAction<number[]>) => {
      state.guitarsId = action.payload;
    },
  },
});

export default data.reducer;
