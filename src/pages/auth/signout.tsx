import {NextPageContext} from 'next';
import React from 'react';
import {useSession, signOut} from 'next-auth/react';
import {checkSession} from 'src/checkSession';

const SignOut = () => {
  const {data: session, status} = useSession();
  if (session) {
    return <button onClick={() => signOut()}>{status}</button>;
  }
  return <div>{status}</div>;
};

export async function getServerSideProps(context: NextPageContext) {
  return await checkSession(context, '', '', false);
}

export default SignOut;
