import React from 'react';
import {UserTypes} from 'src/types/UserTypes';

type RoleType<T> = {
  Component: React.FC<T>;
  role: string;
};

const Role: React.FC<RoleType<any>> = ({Component, role, ...props}) => {
  if (role === 'superAdmin') return <Component {...props} />;
  return null;
};

export default Role;
