import React from 'react';
import {userApi} from 'src/api';
import {TableCell, TableRow, Avatar, Button, Stack} from '@mui/material';
import {ApiUsersType} from 'src/types/api';

export type PickUserDataType = Pick<
  ApiUsersType,
  'firstName' | 'lastName' | 'email' | 'id'
>;

type UserTableProps = ApiUsersType & {
  setUser: (user: PickUserDataType) => void;
  setIsModalShow: (state: boolean) => void;
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
  updatedAt,
  setUsersData,
  usersData,
  setUser,
  setIsModalShow,
}) => {
  const editUser = (user: PickUserDataType) => {
    setIsModalShow(true);
    setUser(user);
  };

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

  return (
    <TableRow key={id}>
      <TableCell width='80px'>
        <Avatar src={image} alt={firstName} />
      </TableCell>
      <TableCell>{firstName}</TableCell>
      <TableCell>{lastName}</TableCell>
      <TableCell>{email}</TableCell>
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
          <Button
            variant='outlined'
            color='secondary'
            onClick={() =>
              editUser({
                id,
                firstName,
                lastName,
                email,
              })
            }
          >
            edit
          </Button>
        </Stack>
      </TableCell>
    </TableRow>
  );
};

export default UserTable;
