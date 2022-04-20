import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.API_URI,
});

export * as userApi from 'src/api/user';
