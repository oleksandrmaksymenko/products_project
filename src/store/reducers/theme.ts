import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {HYDRATE} from 'next-redux-wrapper';

type InitialStateType = boolean;

const initialState: InitialStateType = true;

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme(state, {payload}: PayloadAction<InitialStateType>) {
      return payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, {payload}) => {
      return payload.theme;
    },
  },
});

export const {setTheme} = themeSlice.actions;
