import {GetServerSidePropsContext} from 'next';
import React from 'react';
import {checkSession} from 'src/checkSession';
import {wrapper} from 'src/store';
import {companiesApi} from 'src/api';
import {getCompanies} from 'src/store/reducers';

const Settings = () => {
  return <div>settings</div>;
};

export const getServerSideProps = wrapper.getServerSideProps(
  store => async (context: GetServerSidePropsContext) => {
    try {
      const {data} = await companiesApi.getCompanies();
      store.dispatch(getCompanies(data));
    } catch (e) {
      console.log(e);
    }
    return await checkSession(context, '', '', false);
  }
);

export default Settings;
