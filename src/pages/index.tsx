import type {NextPage} from 'next';
import GuardProvider from 'src/components/Guard/GuardProvider';
import PopularProduct from 'src/components/Home/PopularProduct';

const Home: NextPage = () => {
  return (
    <GuardProvider>
      <PopularProduct />
    </GuardProvider>
  );
};

export default Home;
