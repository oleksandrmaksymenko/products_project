import {configureStore} from '@reduxjs/toolkit';
import {createWrapper} from 'next-redux-wrapper';
import {
  snackBarSlice,
  usersSlice,
  popupSlice,
  themeSlice,
  currentUserSlice,
} from 'src/store/reducers';

const makeStore = () =>
  configureStore({
    reducer: {
      [popupSlice.name]: popupSlice.reducer,
      [snackBarSlice.name]: snackBarSlice.reducer,
      [usersSlice.name]: usersSlice.reducer,
      [themeSlice.name]: themeSlice.reducer,
      [currentUserSlice.name]: currentUserSlice.reducer,
    },
    devTools: true,
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;

const store = makeStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const wrapper = createWrapper<AppStore>(makeStore);
