import UseEdit from 'src/components/User/Edit';
import UserCreate from 'src/components/User/Create';
import UserInfo from 'src/components/User/Info';

export const type = {
  createUser: 'createUser',
  currentUser: 'currentUser',
  userInfo: 'userInfo',
};

export const componentsType = (props: any) => ({
  [type.createUser]: <UserCreate {...props} />,
  [type.currentUser]: <UseEdit {...props} />,
  [type.userInfo]: <UserInfo {...props} />,
});
