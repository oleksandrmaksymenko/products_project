import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type InitialStateType = {
  type: string;
  title: string;
  isShow?: boolean;
  props?: any;
};

const initialState: InitialStateType = {
  isShow: false,
  type: '',
  title: '',
  props: null,
};

export const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    showPopup(state, {payload}: PayloadAction<InitialStateType>) {
      return {
        isShow: true,
        type: payload.type,
        title: payload.title,
        props: payload.props,
      };
    },
    clearPopup() {
      return {
        ...initialState,
      };
    },
  },
});

export const {showPopup, clearPopup} = popupSlice.actions;
