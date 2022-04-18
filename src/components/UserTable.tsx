import React from 'react';
import {userApi} from 'src/api';
import {TableCell, TableRow, Avatar, Button, Stack} from '@mui/material';
import {useAppDispatch} from 'src/store/hooks';
import {setCurrentUser, showPopup} from 'src/store/reducers';
import {ApiUsersType} from 'src/types/api';

export type PickUserDataType = Pick<
  ApiUsersType,
  'firstName' | 'lastName' | 'email' | 'id'
>;

type UserTableProps = ApiUsersType & {
  setUsersData: (user: ApiUsersType[]) => void;
  usersData: ApiUsersType[];
};

const UserTable: React.FC<UserTableProps> = ({
  id,
  image,
  firstName,
  lastName,
  createdAt,
  email,
  role,
  updatedAt,
  setUsersData,
  usersData,
}) => {
  const dispatch = useAppDispatch();

  const deleteUser = (id: string) => {
    try {
      userApi.deleteUser(id);

      const deletedUser: ApiUsersType[] = usersData.filter(
        user => user.id !== id
      );
      setUsersData(deletedUser);
    } catch (e) {
      console.log(e);
    }
  };

  const handleEdit = () => {
    dispatch(
      showPopup({
        type: 'currentUser',
        title: 'Edit User',
      })
    );
    dispatch(
      setCurrentUser({
        id,
        firstName,
        lastName,
        email,
      })
    );
  };

  const handleClick = () => {
    // TODO: Show user popup info
  };

  return (
    <TableRow key={id} onClick={handleClick}>
      <TableCell width='80px'>
        <Avatar src={image} alt={firstName} />
      </TableCell>
      <TableCell>{firstName}</TableCell>
      <TableCell>{lastName}</TableCell>
      <TableCell>{email}</TableCell>
      <TableCell>{role}</TableCell>
      <TableCell>{new Date(createdAt).toLocaleDateString()}</TableCell>
      <TableCell>
        {updatedAt ? new Date(updatedAt).toLocaleDateString() : 'Do not update'}
      </TableCell>
      <TableCell>
        <Stack direction='row' spacing={2}>
          <Button
            variant='outlined'
            color='secondary'
            onClick={() => deleteUser(id)}
          >
            delete
          </Button>
          <Button variant='outlined' color='secondary' onClick={handleEdit}>
            edit
          </Button>
        </Stack>
      </TableCell>
    </TableRow>
  );
};

export default UserTable;
