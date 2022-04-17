import React from 'react';
import styled from '@emotion/styled';
import {Button, Stack, TextField} from '@mui/material';
import {userApi} from 'src/api';
import {useAppDispatch} from 'src/store/hooks';
import {showSnackBar} from 'src/store/reducers/snackbar';

const StackContainer = styled.button`
  margin-top: 16px;
`.withComponent(Stack);

type CreateUserType = {
  firstName: string;
  lastName: string;
  email: string;
};

type UserCreateProps = {
  handleClose: () => void;
};

const UserCreate: React.FC<UserCreateProps> = ({handleClose}) => {
  const [userState, setUserState] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserState({
      ...userState,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreate = () => {
    userApi
      .createUser(userState)
      .then(() => {
        handleClose();
      })
      .catch(e => {
        console.log(e);
        dispatch(
          showSnackBar({
            text: e.message,
            type: 'error',
          })
        );
      });
  };

  return (
    <>
      <Stack
        direction='column'
        justifyContent='center'
        alignItems='stretch'
        spacing={3}
      >
        <TextField
          name='firstName'
          id='firstName'
          label='User First Name'
          variant='standard'
          value={userState.firstName}
          onChange={handleChange}
        />
        <TextField
          name='lastName'
          id='lastName'
          label='User Last Name'
          variant='standard'
          value={userState.lastName}
          onChange={handleChange}
        />
        <TextField
          name='email'
          id='email'
          label='User email'
          variant='standard'
          value={userState.email}
          onChange={handleChange}
        />
      </Stack>
      <StackContainer
        direction='row'
        justifyContent='flex-end'
        alignItems='center'
        spacing={2}
      >
        <Button color='primary' onClick={handleClose}>
          Cancel
        </Button>
        <Button color='secondary' onClick={handleCreate}>
          Submit
        </Button>
      </StackContainer>
    </>
  );
};

export default UserCreate;
