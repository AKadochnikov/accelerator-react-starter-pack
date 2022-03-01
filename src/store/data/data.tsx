import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AddedGuitar} from '../../types/types';
import {NameSpace} from '../../const';

export interface dataState {
  addedGuitars: AddedGuitar[];
}

const initialState: dataState = {
  addedGuitars: [],
};

export const data = createSlice({
  name: NameSpace.data,
  initialState,
  reducers: {
    addGuitar: (state, action: PayloadAction<AddedGuitar[]>) => {
      state.addedGuitars = action.payload;
    },
  },
});

export default data.reducer;
