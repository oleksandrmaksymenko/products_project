import React from 'react';
import {GetServerSidePropsContext} from 'next';
import {signIn} from 'next-auth/react';
import {checkSession} from 'src/checkSession';
import Button from '@mui/material/Button';
import SignIn from 'src/components/Auth/SignIn';

const LogIn = () => <SignIn />;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return await checkSession({context});
}

export default LogIn;
