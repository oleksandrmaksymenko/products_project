import React from 'react';
import {green} from '@mui/material/colors';
import {Typography, Avatar} from '@mui/material';
import styled from '@emotion/styled';
import type {UserTypes} from 'src/types/UserTypes';

const Div = styled.div`
  text-align: center;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const UserCard: React.FC<UserTypes> = ({image, name, email}) => {
  return (
    <Div>
      <Avatar src={image} alt='user image' />
      <Typography variant='subtitle1' component='p' color={green[200]}>
        {name}
      </Typography>
    </Div>
  );
};

export default UserCard;
