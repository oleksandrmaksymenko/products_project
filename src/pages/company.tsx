import React from 'react';
import {GetServerSidePropsContext} from 'next';
import {useForm} from 'react-hook-form';
import {checkSession} from 'src/checkSession';
import {wrapper} from 'src/store';
import {companiesApi} from 'src/api';
import {TextField, Button} from '@mui/material';

const Company = () => {
  const {register, handleSubmit} = useForm();

  const submit = (formState: {[key: string]: string}) => {
    console.log(formState);
  };

  return (
    <form onSubmit={e => handleSubmit(submit)(e)}>
      <TextField
        {...register('company', {
          minLength: 2,
          maxLength: 10,
          required: true,
        })}
        placeholder='company name'
      />
      <TextField
        {...register('description', {
          minLength: 2,
          maxLength: 10,
          required: true,
        })}
        placeholder='description'
      />
      <Button type='submit'>Submit</Button>
    </form>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  store => async (context: GetServerSidePropsContext) => {
    try {
      const {data} = await companiesApi.getCompanies();
      if (data.length) {
        return await checkSession({context});
      }
    } catch (e) {
      console.log(e);
    }

    return await checkSession({context});
  }
);

export default Company;
