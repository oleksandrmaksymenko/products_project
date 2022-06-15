import styled from '@emotion/styled';
import {useSession} from 'next-auth/react';
import React from 'react';
import Aside from 'src/components/Aside';
import Popup from 'src/components/Popup';
import SnackBar from 'src/components/SnackBar';
import UserTopBar from 'src/components/User/TopBar';
import SignIn from 'src/components/Auth/SignIn';

const LayoutContainer = styled.div`
  height: calc(100vh - 32px);
  padding: 16px;
  display: flex;
`;

const ChildrenContainer = styled.main`
  margin-left: ${({isCompanyExist}: Record<'isCompanyExist', boolean>) =>
    isCompanyExist && '266px'};
`;

type LayoutType = {
  children: React.ReactNode;
  isCompanyExist: boolean;
};

const Layout: React.FC<LayoutType> = ({children, isCompanyExist}) => {
  const {data: session} = useSession();

  return (
    <LayoutContainer>
      {isCompanyExist && (
        <>
          {!session && <SignIn />}
          {session && <Aside />}
          <Popup />
          <SnackBar />
        </>
      )}
      <ChildrenContainer isCompanyExist={isCompanyExist}>
        <UserTopBar />
        {children}
      </ChildrenContainer>
    </LayoutContainer>
  );
};

export default Layout;
