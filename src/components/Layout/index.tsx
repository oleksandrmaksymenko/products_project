import styled from '@emotion/styled';
import {useSession} from 'next-auth/react';
import React from 'react';
import Aside from 'src/components/Aside';
import Popup from 'src/components/Popup';
import SnackBar from 'src/components/SnackBar';
import UserTopBar from 'src/components/User/TopBar';
import SignIn from 'src/pages/auth/signin';

const LayoutContainer = styled.div`
  height: calc(100vh - 32px);
  padding: 16px;
  display: flex;
`;

const ChildrenContainer = styled.main`
  margin-left: 266px;
`;

type LayoutType = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutType> = ({children}) => {
  const {data: session} = useSession();

  return (
    <LayoutContainer>
      {!session && <SignIn />}
      {session && <Aside />}
      <Popup />
      <SnackBar />
      <ChildrenContainer>
        <UserTopBar />
        {children}
      </ChildrenContainer>
    </LayoutContainer>
  );
};

export default Layout;
