import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URI,
  headers: {
    'Content-Type': 'application/json',
  },
});

export * as userApi from 'src/api/user';
export * as productApi from 'src/api/products';
