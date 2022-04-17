import {configureStore} from '@reduxjs/toolkit';
import {createWrapper} from 'next-redux-wrapper';
import {snackBarSlice} from 'src/store/reducers/snackbar';
import {popupSlice} from './reducers/popup';

const makeStore = () =>
  configureStore({
    reducer: {
      [popupSlice.name]: popupSlice.reducer,
      [snackBarSlice.name]: snackBarSlice.reducer,
    },
    devTools: true,
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;

export const store = makeStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const wrapper = createWrapper<AppStore>(makeStore);
