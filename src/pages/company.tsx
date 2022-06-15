import React from 'react';
import {GetServerSidePropsContext} from 'next';
import {checkSession} from 'src/checkSession';
import {wrapper} from 'src/store';
import {companiesApi} from 'src/api';

const Company = () => {
  return <div>Company</div>;
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
