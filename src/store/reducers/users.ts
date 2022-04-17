import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ApiUsersType} from 'src/types/api';
import {HYDRATE} from 'next-redux-wrapper';

type InitialStateType = ApiUsersType[];

const initialState: InitialStateType = [];

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    getUsers(state, {payload}: PayloadAction<InitialStateType>) {
      return payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, {payload}) => {
      return payload.users;
    },
  },
});

export const {getUsers} = usersSlice.actions;
