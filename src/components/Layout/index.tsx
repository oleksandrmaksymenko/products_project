import styled from '@emotion/styled';
import Switch from '@mui/material/Switch';
import {useSession} from 'next-auth/react';
import React from 'react';
import Aside from 'src/components/Aside';
import Popup from 'src/components/Popup';
import SnackBar from 'src/components/SnackBar';
import SignIn from 'src/pages/auth/signin';
import {useAppDispatch, useAppSelector} from 'src/store/hooks';
import {setTheme} from 'src/store/reducers';

const Input = styled.input`
  position: fixed;
  top: 0;
  right: 0;
`.withComponent(Switch);

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
  const theme = useAppSelector(state => state.theme);

  const dispatch = useAppDispatch();

  return (
    <LayoutContainer>
      {!session && <SignIn />}
      {session && <Aside />}
      <Input onChange={() => dispatch(setTheme(!theme))} value={theme} />
      <Popup />
      <SnackBar />
      <ChildrenContainer>{children}</ChildrenContainer>
    </LayoutContainer>
  );
};

export default Layout;
