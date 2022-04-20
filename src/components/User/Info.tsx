import {Typography, Divider} from '@mui/material';
import React from 'react';
import {useAppSelector} from 'src/store/hooks';

const UserInfo = () => {
  const user = useAppSelector(state => state.currentUser);
  return (
    <div>
      <Divider sx={{marginBottom: 1}} />
      <Typography variant='body2' component='p'>
        {user.firstName}
      </Typography>
      <Typography variant='body2' component='p'>
        {user.lastName}
      </Typography>
      <Typography variant='body2' component='p'>
        {user.email}
      </Typography>
    </div>
  );
};

export default UserInfo;
