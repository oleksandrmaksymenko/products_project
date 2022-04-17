import styled from '@emotion/styled';
import {useSession} from 'next-auth/react';
import Link from 'next/link';
import React from 'react';
import Navigation from 'src/components/Aside/Navigation';
import MuiLink from '@mui/material/Link';
import {Stack, Typography, Paper} from '@mui/material';
import UserCard from 'src/components/UserCard';

const menuItems = [
  {
    href: 'users',
    title: 'Users',
  },
  {
    href: 'products',
    title: 'Products',
  },
  {
    href: 'settings',
    title: 'Settings',
  },
];

const StyledAside = styled.aside`
  width: 250px;
  height: calc(100% - 32px);
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 10px;
  position: fixed;
`.withComponent(Paper);

const Aside: React.FC = () => {
  const {data: session} = useSession();

  return (
    <StyledAside elevation={2} variant='elevation'>
      {session && <UserCard {...session.user} />}
      {session && (
        <Stack direction='column'>
          {menuItems.map(menu => (
            <Link key={menu.href} href={`/${menu.href}`} passHref>
              <MuiLink color='secondary' underline='hover'>
                <Typography component='p'>{menu.title}</Typography>
              </MuiLink>
            </Link>
          ))}
        </Stack>
      )}
      <Navigation />
    </StyledAside>
  );
};

export default Aside;
