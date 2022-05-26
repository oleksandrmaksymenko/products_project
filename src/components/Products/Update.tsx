import {Button, TextField, Typography} from '@mui/material';
import React from 'react';
import {ApiProductsType} from 'src/types/api';
import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonContainer = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;

  & > button {
    margin-right: 16px;
  }
`;

const ProductsUpdate: React.FC<ApiProductsType> = ({
  price,
  image,
  _id,
  name,
  description,
}) => {
  const [product, setProduct] = React.useState({price, name, description});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {};

  const handleCancel = () => {};

  return (
    <>
      <Container>
        <TextField
          onChange={handleChange}
          value={product.name}
          name='name'
          size='small'
          variant='filled'
        />
        <TextField
          onChange={handleChange}
          value={product.price}
          name='price'
          size='small'
          variant='filled'
        />
        <TextField
          onChange={handleChange}
          value={product.description}
          name='description'
          size='small'
          variant='filled'
        />
      </Container>
      <ButtonContainer>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </ButtonContainer>
    </>
  );
};

export default ProductsUpdate;
