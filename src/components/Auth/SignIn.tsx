import Button from '@mui/material/Button';
import {signIn} from 'next-auth/react';
import React from 'react';

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

export default SignIn;
