import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AddedGuitar} from '../../types/types';
import {NameSpace} from '../../const';

export interface dataState {
  addedGuitars: AddedGuitar[];
  discount: number;
}

const initialState: dataState = {
  addedGuitars: [],
  discount: 0,
};

export const data = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    addGuitar: (state, action: PayloadAction<AddedGuitar[]>) => {
      state.addedGuitars = action.payload;
    },
    addDiscount: (state, action: PayloadAction<number>) => {
      state.discount = action.payload;
    },
  },
});

export default data.reducer;
