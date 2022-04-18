import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ApiUsersType} from 'src/types/api';

type InitialStateType = Pick<
  ApiUsersType,
  'id' | 'firstName' | 'lastName' | 'email'
>;

const initialState: InitialStateType = {
  id: '',
  firstName: '',
  lastName: '',
  email: '',
};

export const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    setCurrentUser(state, {payload}: PayloadAction<InitialStateType>) {
      return payload;
    },
    clearCurrentUser() {
      return initialState;
    },
  },
});

export const {setCurrentUser, clearCurrentUser} = currentUserSlice.actions;
