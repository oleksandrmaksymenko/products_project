import React from 'react';
import {
  Avatar,
  Button,
  Stack,
  TableBody,
  TableCell,
  TableRow,
} from '@mui/material';
import {useDispatch} from 'react-redux';
import {showPopup} from 'src/store/reducers';
import {ApiProductsType} from 'src/types/api';
import {type} from 'src/components/Popup/componentsType';

const ProductsBody: React.FC<Record<'products', ApiProductsType[]>> = ({
  products,
}) => {
  const dispatch = useDispatch();
  const handleDelete = (id: string) => {};

  const handleEdit = (product: ApiProductsType) => {
    dispatch(
      showPopup({
        type: type.updateProduct,
        title: 'Edit product',
        props: {...product},
      })
    );
  };

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
                <Button
                  variant='outlined'
                  color='secondary'
                  onClick={() => handleDelete(product._id)}
                >
                  delete
                </Button>
                <Button
                  variant='outlined'
                  color='secondary'
                  onClick={() => handleEdit(product)}
                >
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
