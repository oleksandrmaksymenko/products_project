import {
  Avatar,
  Button,
  Stack,
  TableBody,
  TableCell,
  TableRow,
} from '@mui/material';
import React from 'react';
import {ApiProductsType} from 'src/types/api';

const ProductsBody: React.FC<Record<'products', ApiProductsType[]>> = ({
  products,
}) => {
  return (
    <TableBody>
      {products &&
        products.map(product => (
          <TableRow key={product._id}>
            <TableCell width='80px'>
              <Avatar src={product.image} />
            </TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell>{product.price}</TableCell>
            <TableCell>{new Date(Date.now()).toLocaleDateString()}</TableCell>
            <TableCell>{new Date(Date.now()).toLocaleDateString()}</TableCell>
            <TableCell>
              <Stack direction='row' spacing={2}>
                <Button variant='outlined' color='secondary'>
                  delete
                </Button>
                <Button variant='outlined' color='secondary'>
                  edit
                </Button>
              </Stack>
            </TableCell>
          </TableRow>
        ))}
    </TableBody>
  );
};

export default ProductsBody;
