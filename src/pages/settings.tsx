import {NextPageContext} from 'next';
import React from 'react';
import {checkSession} from 'src/checkSession';

const Settings = () => {
  return <div>settings</div>;
};

export async function getServerSideProps(context: NextPageContext) {
  return await checkSession(context, '', '', false);
}

export default Settings;
