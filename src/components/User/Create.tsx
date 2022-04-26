import React from 'react';
import {Stack, TextField} from '@mui/material';
import {userApi} from 'src/api';
import ModalButtons from 'src/components/ModalButtons';
import {useAppDispatch} from 'src/store/hooks';
import {showSnackBar} from 'src/store/reducers/snackbar';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

type CreateUserType = {
  firstName: string;
  lastName: string;
  email: string;
};

type UserCreateProps = {
  handleClose: () => void;
};

const userSchema = yup.object({
  firstName: yup
    .string()
    .min(2, 'Must be more than 2 characrers')
    .required('FirstName is required'),
  lastName: yup
    .string()
    .min(2, 'Must be more than 2 characrers')
    .required('LastName is required'),
  email: yup
    .string()
    .min(7, 'Must be more than 7 characrers')
    .email('Invalid email format')
    .max(255)
    .required('Email is required'),
});

const UserCreate: React.FC<UserCreateProps> = ({handleClose}) => {
  const {
    handleSubmit,
    formState: {errors},
    control,
  } = useForm({
    resolver: yupResolver(userSchema),
    mode: 'onBlur',
  });

  const dispatch = useAppDispatch();

  const onSubmit = (data: {[key: string]: any}) => {
    console.log(data, ' <<< data');
    userApi
      .createUser(data as CreateUserType)
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack
        direction='column'
        justifyContent='center'
        alignItems='stretch'
        spacing={3}
      >
        <Controller
          name='firstName'
          control={control}
          render={({field}) => (
            <TextField
              label='User First Name'
              variant='standard'
              error={errors.firstName}
              helperText={
                errors.firstName
                  ? errors.firstName.message
                  : 'User first name must be at least 2 characters'
              }
              {...field}
            />
          )}
        />
        <Controller
          name='lastName'
          control={control}
          render={({field}) => (
            <TextField
              label='User Last Name'
              variant='standard'
              error={errors.lastName}
              helperText={
                errors.lastName
                  ? errors.lastName.message
                  : 'User last name must be at least 2 characters'
              }
              {...field}
            />
          )}
        />
        <Controller
          name='email'
          control={control}
          render={({field}) => (
            <TextField
              label='User email'
              variant='standard'
              error={errors.email}
              helperText={
                errors.email
                  ? errors.email.message
                  : 'User email must be at least 7 characters'
              }
              {...field}
            />
          )}
        />
      </Stack>
      <ModalButtons
        {...{handleClose}}
        error={Object.values(errors).length === 0}
        submit
      />
    </form>
  );
};

export default UserCreate;
