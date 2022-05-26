import styled from '@emotion/styled';
import {blueGrey} from '@mui/material/colors';
import {useSession} from 'next-auth/react';
import Link from 'next/link';
import React from 'react';
import Navigation from 'src/components/Aside/Navigation';
import MuiLink from '@mui/material/Link';
import {Stack, Typography, Paper, Divider} from '@mui/material';

const menuItems = [
  {
    href: '/',
    title: 'Dashboard',
  },
  {
    href: 'users',
    title: 'Customers',
  },
  {
    href: 'products',
    title: 'Products',
  },
  {
    href: 'orders',
    title: 'Orders',
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

const Figure = styled.figure`
  display: flex;
  margin-bottom: 16px;
`;

const Figcaption = styled.figcaption`
  margin-left: 16px;
`;

const Aside: React.FC = () => {
  const {data: session} = useSession();

  return (
    <StyledAside elevation={2} variant='elevation'>
      <div>
        <Figure>
          <img src='https://via.placeholder.com/50' alt='' />
          <Figcaption>
            <Typography variant='body1' color='secondary'>
              Company name
            </Typography>
            <Typography variant='body2' color={blueGrey[50]}>
              v0.0.1
            </Typography>
          </Figcaption>
        </Figure>
        <Divider sx={{marginBottom: '16px'}} />
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
      </div>
      <Navigation />
    </StyledAside>
  );
};

export default Aside;
