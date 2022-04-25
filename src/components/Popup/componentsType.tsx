import ProductsCreate from 'src/components/Products/Create';
import UseEdit from 'src/components/User/Edit';
import UserCreate from 'src/components/User/Create';
import UserInfo from 'src/components/User/Info';

export const type = {
  createUser: 'createUser',
  currentUser: 'currentUser',
  userInfo: 'userInfo',
  createProduct: 'createProduct',
};

export const componentsType = (props: any) => ({
  [type.createUser]: <UserCreate {...props} />,
  [type.currentUser]: <UseEdit {...props} />,
  [type.userInfo]: <UserInfo {...props} />,
  [type.createProduct]: <ProductsCreate {...props} />,
});
