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
    title: 'Product',
  },
  {
    href: 'settings',
    title: 'Settings',
  },
];

const StyledAside = styled
  .aside({
    width: '200px',
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '10px',
  })
  .withComponent(Paper);

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
