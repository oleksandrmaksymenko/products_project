import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type InitialStateType = {
  type: string;
  title: string;
  isShow?: boolean;
  popupProps?: any;
};

const initialState: InitialStateType = {
  isShow: false,
  type: '',
  title: '',
  popupProps: null,
};

export const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    showPopup(state, {payload}: PayloadAction<InitialStateType>) {
      state.isShow = true;
      state.type = payload.type;
      state.title = payload.title;
      state.popupProps = payload.popupProps;
    },
    clearPopup(state) {
      state.isShow = initialState.isShow;
      state.type = initialState.type;
      state.title = initialState.title;
      state.popupProps = initialState.popupProps;
    },
  },
});

export const {showPopup, clearPopup} = popupSlice.actions;
