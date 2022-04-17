import React from 'react';
import {Box, Button, Modal, Stack, TextField, Typography} from '@mui/material';
import type {PickUserDataType} from 'src/components/UserTable';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

type UserModalProps = {
  isModalShow: boolean;
  handleClose: () => void;
  saveUserData: (userData: any) => void;
  user: PickUserDataType;
};

const UserModal: React.FC<UserModalProps> = ({
  isModalShow,
  handleClose,
  user,
  saveUserData,
}) => {
  const [userData, setUserData] = React.useState<
    PickUserDataType & {password: string}
  >({...user, password: ''});

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({...userData, [e.target.name]: e.target.value});
  };

  return (
    <Modal
      open={isModalShow}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        {user && (
          <Stack direction='column' spacing={2}>
            <Typography variant='subtitle1' color='secondary'>
              Edit user
            </Typography>
            <TextField
              onChange={handleChangeName}
              value={userData.firstName}
              name='firstName'
              size='small'
              variant='filled'
            />
            <TextField
              onChange={handleChangeName}
              value={userData.lastName}
              name='lastName'
              size='small'
              variant='filled'
            />
            <TextField
              onChange={handleChangeName}
              value={userData.email}
              name='email'
              size='small'
              variant='filled'
            />
            <TextField
              onChange={handleChangeName}
              value={userData.password}
              type='password'
              size='small'
              variant='filled'
              name='password'
            />
            <Button
              color='secondary'
              onClick={() => saveUserData({...userData, id: user.id})}
            >
              Submit
            </Button>
          </Stack>
        )}
      </Box>
    </Modal>
  );
};

export default UserModal;
