import {Typography, Divider} from '@mui/material';
import React from 'react';
import {ApiUsersType} from 'src/types/api';

const UserInfo: React.FC<ApiUsersType> = ({firstName, lastName, email}) => {
  return (
    <div>
      <Divider sx={{marginBottom: 1}} />
      <Typography variant='body2' component='p'>
        {firstName}
      </Typography>
      <Typography variant='body2' component='p'>
        {lastName}
      </Typography>
      <Typography variant='body2' component='p'>
        {email}
      </Typography>
    </div>
  );
};

export default UserInfo;
