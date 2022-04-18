import React from 'react';
import {GetServerSidePropsContext} from 'next';
import {signIn} from 'next-auth/react';
import {checkSession} from 'src/checkSession';
import Button from '@mui/material/Button';

const SignIn = () => {
  const handeClick = () => {
    signIn('google')
      .then(res => {
        console.log(res);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return <Button onClick={handeClick}>signIn</Button>;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return await checkSession(context, '/profile', '', true);
}

export default SignIn;
