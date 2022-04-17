import {AlertColor} from '@mui/material/Alert/Alert';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type InitialStateType = {
  type: AlertColor;
  text: string;
  isShow?: boolean;
};

const initialState: InitialStateType = {
  type: 'info',
  text: '',
  isShow: false,
};

export const snackBarSlice = createSlice({
  name: 'snackBar',
  initialState,
  reducers: {
    showSnackBar(state, {payload}: PayloadAction<InitialStateType>) {
      state.isShow = true;
      state.type = payload.type;
      state.text = payload.text;
    },
    clearSnackBar(state) {
      state.isShow = initialState.isShow;
      state.type = initialState.type;
      state.text = initialState.text;
    },
  },
});

export const {showSnackBar, clearSnackBar} = snackBarSlice.actions;
