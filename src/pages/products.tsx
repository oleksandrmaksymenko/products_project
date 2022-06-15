import {GetServerSidePropsContext} from 'next';
import React from 'react';
import {productApi} from 'src/api';
import {checkSession} from 'src/checkSession';
import ListHead from 'src/components/List/Head';
import Pagination from 'src/components/List/Pagination';
import Search from 'src/components/List/Search';
import ProductsList from 'src/components/Products/Body';
import ProductsCreate from 'src/components/Products/Create';
import ProductsUpdate from 'src/components/Products/Update';
import TableTopBar from 'src/components/List/TableTopBar';
import {wrapper} from 'src/store';
import {useAppDispatch, useAppSelector} from 'src/store/hooks';
import {showPopup} from 'src/store/reducers';
import {getProducts} from 'src/store/reducers/products';
import {ApiProductsType} from 'src/types/api';
import {ListContainer} from 'src/ui';
import {TableContainer, Paper, Table} from '@mui/material';

const t = ['Image', 'Title', 'Price', 'Created At', 'Updated At', ''];

const Products = () => {
  const dispatch = useAppDispatch();
  const [page, setPage] = React.useState(0);
  const products = useAppSelector(store => store.products);
  const [productsData, setProductsData] =
    React.useState<ApiProductsType[]>(products);

  const createProduct = () => {
    dispatch(
      showPopup({
        type: 'createProduct',
        title: 'Create Product',
      })
    );
  };
  const filterProducts = () => {};

  return (
    <ListContainer>
      <TableTopBar
        handleClick={createProduct}
        title='Products Management'
        type='Product'
      />
      <Pagination page={page} setPage={setPage} pageCount={0} />
      <TableContainer component={Paper}>
        <Search onChange={filterProducts} label='Search Product' />
        <Table>
          <ListHead head={t} />
          <ProductsList products={productsData} />
        </Table>
      </TableContainer>
    </ListContainer>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  store => async (context: GetServerSidePropsContext) => {
    try {
      const {data} = await productApi.getProducts();
      store.dispatch(getProducts(data));
    } catch (e) {
      console.log(e);
    }

    return await checkSession({
      context,
      signOut: '/auth/signin',
      isRedirect: true,
    });
  }
);

export default Products;
