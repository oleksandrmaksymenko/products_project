import React from 'react';
import {Stack, TextField} from '@mui/material';
import {userApi} from 'src/api';
import ModalButtons from 'src/components/ModalButtons';
import {useAppDispatch} from 'src/store/hooks';
import {showSnackBar} from 'src/store/reducers/snackbar';

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
      <ModalButtons {...{handleClose}} {...{handleCreate}} />
    </>
  );
};

export default UserCreate;
