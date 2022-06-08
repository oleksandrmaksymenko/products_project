import ProductsCreate from 'src/components/Products/Create';
import UseEdit from 'src/components/User/Edit';
import UserCreate from 'src/components/User/Create';
import UserInfo from 'src/components/User/Info';
import ProductsUpdate from 'src/components/Products/Update';
import CompanyCreate from 'src/components/Company/Create';

export const type = {
  createUser: 'createUser',
  currentUser: 'currentUser',
  userInfo: 'userInfo',
  createProduct: 'createProduct',
  updateProduct: 'updateProduct',
  createCompany: 'createCompany',
};

export const componentsType = (props: any) => ({
  [type.createUser]: <UserCreate {...props} />,
  [type.currentUser]: <UseEdit {...props} />,
  [type.userInfo]: <UserInfo {...props} />,
  [type.createProduct]: <ProductsCreate {...props} />,
  [type.updateProduct]: <ProductsUpdate {...props} />,
  [type.createCompany]: <CompanyCreate {...props} />,
});
