import React from 'react';

type GuardProps = {
  children: React.ReactNode;
  isAllowed?: boolean;
};

const Guard: React.FC<GuardProps> = ({children, isAllowed}) => {
  if (isAllowed) {
    return <div>{children}</div>;
  }
  return null;
};

export default Guard;
