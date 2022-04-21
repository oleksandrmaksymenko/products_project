import {api} from './index';

export const getProducts = async () => await api.get('/products');

export const getProduct = async (id: string) =>
  await api.get(`/products?product_id${id}`);

export const createProduct = async (product: any) =>
  await api.post('/products', {
    ...product,
  });

export const deleteProduct = async (id: string) =>
  await api.delete('/product', {data: {id}});

export const updateProduct = async (product: any) =>
  await api.patch('/products', {...product});
