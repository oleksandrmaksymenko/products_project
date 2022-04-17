import UserCreate from 'src/User/Create';

export const type = {
  createUser: 'createUser',
};

export const componentsType = (props: any) => ({
  [type.createUser]: <UserCreate {...props} />,
});
