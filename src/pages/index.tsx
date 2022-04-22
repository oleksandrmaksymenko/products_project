import type {NextPage} from 'next';
import PopularProduct from 'src/components/Home/PopularProduct';

const Home: NextPage = () => {
  return (
    <div>
      Home
      <PopularProduct />
    </div>
  );
};

export default Home;
