import React, {useState} from 'react';
import {FormGroup, TextField, Typography} from '@mui/material';
import ModalButtons from 'src/components/ModalButtons';
import {useAppDispatch} from 'src/store/hooks';
import {clearPopup} from 'src/store/reducers';
import {productApi} from 'src/api';

const ProductsCreate = () => {
  const dispatch = useAppDispatch();
  const [productState, setProductState] = useState({
    title: '',
    description: '',
    price: '',
    image: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductState({...productState, [e.target.name]: e.target.value});
  };

  const handleClose = () => {
    dispatch(clearPopup());
  };

  const handleCreate = () => {
    productApi
      .createProduct(productState)
      .then(() => {
        clearPopup();
      })
      .catch(e => console.log(e));
  };

  return (
    <FormGroup>
      <TextField
        name='title'
        id='title'
        label='Product Title'
        variant='standard'
        value={productState.title}
        onChange={handleChange}
      />
      <TextField
        name='description'
        id='description'
        label='Product Description'
        variant='standard'
        value={productState.description}
        onChange={handleChange}
      />
      <TextField
        name='price'
        id='price'
        label='Product Price'
        variant='standard'
        value={productState.price}
        onChange={handleChange}
      />
      <ModalButtons {...{handleClose}} {...{handleCreate}} />
    </FormGroup>
  );
};

export default ProductsCreate;
