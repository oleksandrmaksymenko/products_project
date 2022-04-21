import {
  Avatar,
  Button,
  Stack,
  TableBody,
  TableCell,
  TableRow,
} from '@mui/material';
import React from 'react';

const ProductsBody = () => {
  return (
    <TableBody>
      <TableRow>
        <TableCell width='80px'>
          <Avatar />
        </TableCell>
        <TableCell>
          Стационарная игровая приставка Retro Genesis 16 bit HD Ultra +150 игр
          (CONSKDN70)
        </TableCell>
        <TableCell>1891uah</TableCell>
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
    </TableBody>
  );
};

export default ProductsBody;
