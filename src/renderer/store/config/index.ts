import {createSlice} from '@reduxjs/toolkit';
import {CONFIG} from '@renderer/constants/actions';
import {ConfigSlice} from '@shared/types';

const initialState: ConfigSlice = {
  storeLoaded: false,
};

const config = createSlice({
  initialState,
  name: CONFIG,
  reducers: {
    setStoreLoadedTrue: (state) => {
      state.storeLoaded = true;
    },
  },
});

export const {setStoreLoadedTrue} = config.actions;

export default config.reducer;
