import {
  Badge,
  Button,
  Divider,
  Fade,
  Menu,
  MenuItem,
  Stack,
  Link as Href,
} from '@mui/material';
import {signOut, useSession} from 'next-auth/react';
import Link from 'next/link';
import React from 'react';
import styled from '@emotion/styled';
import UserCard from 'src/components/User/Card';
import NotificationsIcon from '@mui/icons-material/Notifications';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const TopBar = styled.div`
  width: calc(100vw - 295px);
  margin-bottom: 32px;
  align-items: center;
`.withComponent(Stack);

const Profile = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const UserTopBar = () => {
  const {data: session} = useSession();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <TopBar direction='row' justifyContent='space-between'>
      <div />
      {session && (
        <Profile>
          <IconButton sx={{marginRight: 3}}>
            <Badge badgeContent={2} color='warning'>
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Menu
            id='fade-menu'
            MenuListProps={{
              'aria-labelledby': 'fade-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
          >
            <MenuItem onClick={handleClose}>
              <Link href='/profile/settings' passHref>
                <Href variant='body1' underline='none'>
                  Settings
                </Href>
              </Link>
            </MenuItem>
            <Divider />
            <MenuItem onClick={() => signOut()}>Sign out</MenuItem>
          </Menu>
          <Button
            onClick={handleClick}
            sx={{textAlign: 'left'}}
            endIcon={<KeyboardArrowDownIcon />}
          >
            <UserCard {...session.user} />
          </Button>
        </Profile>
      )}
    </TopBar>
  );
};

export default UserTopBar;
