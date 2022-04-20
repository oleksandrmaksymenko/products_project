import UserModal from 'src/components/User/Modal';
import UserCreate from 'src/components/User/Create';
import UserInfo from 'src/components/User/Info';

export const type = {
  createUser: 'createUser',
  currentUser: 'currentUser',
  userInfo: 'userInfo',
};

export const componentsType = (props: any) => ({
  [type.createUser]: <UserCreate {...props} />,
  [type.currentUser]: <UserModal {...props} />,
  [type.userInfo]: <UserInfo {...props} />,
});
