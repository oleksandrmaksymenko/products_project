import styled from '@emotion/styled';
import {useSession} from 'next-auth/react';
import Link from 'next/link';
import React from 'react';
import MuiLnk from '@mui/material/Link';
import {Typography} from '@mui/material';

export const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const Navigation: React.FC = () => {
  const {data: session} = useSession();

  return (
    <Nav>
      {!session && (
        <Link href='/auth/signin' passHref>
          <MuiLnk color='secondary' underline='hover'>
            Sing IN
          </MuiLnk>
        </Link>
      )}
    </Nav>
  );
};

export default Navigation;
