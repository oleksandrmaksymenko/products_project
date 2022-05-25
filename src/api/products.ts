import {ApiProductsType} from 'src/types/api';
import {api} from './index';

const products = '/products'

export const getProducts = async () => await api.get(products);

export const getProduct = async (id: string) =>
  await api.get(`${products}?product_id=${id}`);

export const createProduct = async (product: Omit<ApiProductsType, '_id'>) =>
  await api.post(products, {
    ...product,
  });

export const deleteProduct = async (id: string) =>
  await api.delete(products, {data: {id}});

export const updateProduct = async (product: ApiProductsType) =>
  await api.patch(products, {...product});
