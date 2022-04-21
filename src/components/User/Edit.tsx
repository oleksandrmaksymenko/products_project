import React from 'react';
import {Button, Stack, TextField} from '@mui/material';
import type {PickUserDataType} from 'src/components/User/Table';
import styled from '@emotion/styled';
import {useAppDispatch} from 'src/store/hooks';
import {clearCurrentUser, clearPopup} from 'src/store/reducers';
import {userApi} from 'src/api';

const StackContainer = styled.div`
  margin-top: 16px;
`.withComponent(Stack);

const UseEdit: React.FC<PickUserDataType> = ({
  _id,
  firstName,
  lastName,
  email,
}) => {
  const dispatch = useAppDispatch();

  const [userData, setUserData] = React.useState<PickUserDataType>({
    _id,
    firstName,
    lastName,
    email,
  });

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({...userData, [e.target.name]: e.target.value});
  };

  const saveUserData = () => {
    userApi
      .updateUser({
        _id: userData._id,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        image: '',
        role: 'some role',
        address: {
          main: {
            type: 'string;',
            street: 'string;',
            house: 'string;',
            apt: 'string;',
            comment: 'string;',
          },
        },
      })
      .then(() => {
        console.log(123);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleCancel = () => {
    dispatch(clearPopup());
    dispatch(clearCurrentUser());
  };

  return (
    <Stack direction='column' spacing={2}>
      <TextField
        onChange={handleChangeName}
        value={userData.firstName}
        name='firstName'
        size='small'
        variant='filled'
      />
      <TextField
        onChange={handleChangeName}
        value={userData.lastName}
        name='lastName'
        size='small'
        variant='filled'
      />
      <TextField
        onChange={handleChangeName}
        value={userData.email}
        name='email'
        size='small'
        variant='filled'
      />
      <StackContainer
        direction='row'
        justifyContent='flex-end'
        alignItems='center'
        spacing={2}
      >
        <Button color='primary' onClick={handleCancel}>
          Cancel
        </Button>
        <Button color='secondary' onClick={saveUserData}>
          Submit
        </Button>
      </StackContainer>
    </Stack>
  );
};

export default UseEdit;
