import UserModal from 'src/components/UserModal';
import UserCreate from 'src/User/Create';

export const type = {
  createUser: 'createUser',
  currentUser: 'currentUser',
};

export const componentsType = (props: any) => ({
  [type.createUser]: <UserCreate {...props} />,
  [type.currentUser]: <UserModal {...props} />,
});
