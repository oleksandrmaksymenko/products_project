import React from 'react';
import ListHead from 'src/components/List/Head';
import Pagination from 'src/components/List/Pagination';
import Search from 'src/components/List/Search';
import ProductsList from 'src/components/Products/Body';
import ProductsCreate from 'src/components/Products/Create';
import ProductsUpdate from 'src/components/Products/Update';
import TableTopBar from 'src/components/List/TableTopBar';
import {ListContainer} from 'src/ui';
import {TableContainer, Paper, Table} from '@mui/material';

const t = ['Image', 'Title', 'Price', 'Created At', 'Updated At', ''];

const Products = () => {
  const createProduct = () => {};
  const filterProducts = () => {};

  return (
    <ListContainer>
      <TableTopBar
        handleClick={createProduct}
        title='Products Management'
        type='Product'
      />
      <Pagination />
      <TableContainer component={Paper}>
        <Search onChange={filterProducts} label='Search Product' />
        <Table>
          <ListHead head={t} />
          <ProductsList />
          <ProductsCreate />
          <ProductsUpdate />
        </Table>
      </TableContainer>
    </ListContainer>
  );
};

export default Products;
