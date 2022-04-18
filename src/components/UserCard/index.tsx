import React from 'react';
import {blueGrey, green} from '@mui/material/colors';
import {Typography, Avatar} from '@mui/material';
import styled from '@emotion/styled';
import type {UserTypes} from 'src/types/UserTypes';

const Div = styled.div`
  display: flex;
`;

const UserCard: React.FC<UserTypes> = ({image, name, email}) => {
  return (
    <Div>
      <Avatar
        src={image}
        alt='user image'
        sx={{marginRight: 2, width: '50px', height: '50px'}}
      />
      <div>
        <Typography variant='subtitle1' component='p' color='info'>
          {name}
        </Typography>
        <Typography variant='body2' component='p' color={blueGrey[200]}>
          {email}
        </Typography>
      </div>
    </Div>
  );
};

export default UserCard;
