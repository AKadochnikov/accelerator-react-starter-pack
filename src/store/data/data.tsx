import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AddedGuitar, Guitar} from '../../types/types';
import {NameSpace} from '../../const';

export interface dataState {
  cartGuitars: Guitar[];
  addedGuitars: AddedGuitar[];
}

const initialState: dataState = {
  cartGuitars: [],
  addedGuitars: [],
};

export const data = createSlice({
  name: NameSpace.data,
  initialState,
  reducers: {
    addCartGuitars: (state, action: PayloadAction<Guitar[]>) => {
      state.cartGuitars = action.payload;
    },
    addGuitar: (state, action: PayloadAction<AddedGuitar[]>) => {
      state.addedGuitars = action.payload;
    },
  },
});

export default data.reducer;
