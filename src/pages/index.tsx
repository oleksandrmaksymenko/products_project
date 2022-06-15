import {GetServerSidePropsContext} from 'next';
import type {NextPage} from 'next';
import {companiesApi} from 'src/api';
import {wrapper} from 'src/store';
import {checkSession} from 'src/checkSession';
import GuardProvider from 'src/components/Guard/GuardProvider';
import PopularProduct from 'src/components/Home/PopularProduct';

const Home: NextPage = () => {
  return (
    <GuardProvider>
      <PopularProduct />
    </GuardProvider>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  store => async (context: GetServerSidePropsContext) => {
    try {
      const {data} = await companiesApi.getCompanies();
      if (data.length) {
        return await checkSession({
          context,
          signIn: '/company',
          isRedirect: true,
        });
      }
    } catch (e) {
      console.log(e);
    }

    return await checkSession({context, isRedirect: true});
  }
);

export default Home;
