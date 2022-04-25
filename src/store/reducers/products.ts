import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {ApiProductsType} from 'src/types/api';
import {HYDRATE} from 'next-redux-wrapper';

type InitialStateType = ApiProductsType[];

const initialState: InitialStateType = [];

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    getProducts(state, {payload}: PayloadAction<InitialStateType>) {
      return payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, {payload}) => {
      return payload.products;
    },
  },
});

export const {getProducts} = productsSlice.actions;
