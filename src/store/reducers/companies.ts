import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {ApiProductsType} from 'src/types/api';
import {HYDRATE} from 'next-redux-wrapper';

type InitialStateType = ApiProductsType[];

const initialState: InitialStateType = [];

export const companiesSlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {
    getCompanies(state, {payload}: PayloadAction<InitialStateType>) {
      return payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, {payload}) => {
      return payload.companies;
    },
  },
});

export const {getCompanies} = companiesSlice.actions;
