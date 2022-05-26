import React from 'react';
import {userApi} from 'src/api';
import {TableCell, TableRow, Avatar, Button, Stack} from '@mui/material';
import {type} from 'src/components/Popup/componentsType';
import {useAppDispatch} from 'src/store/hooks';
import {setCurrentUser, showPopup} from 'src/store/reducers';
import {ApiUsersType} from 'src/types/api';

export type PickUserDataType = Pick<
  ApiUsersType,
  'firstName' | 'lastName' | 'email' | '_id'
>;

type UserTableProps = ApiUsersType & {
  setUsersData: (user: ApiUsersType[]) => void;
  usersData: ApiUsersType[];
};

const UserTable: React.FC<UserTableProps> = ({
  _id,
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
        user => user._id !== id
      );
      setUsersData(deletedUser);
    } catch (e) {
      console.log(e);
    }
  };

  const handleEdit = () => {
    dispatch(
      showPopup({
        type: type.currentUser,
        title: 'Edit User',
        props: {
          _id,
          firstName,
          lastName,
          email,
        },
      })
    );
  };

  const handleClick = (e: any) => {
    // TODO: Show user popup info
    if (e.target.localName !== 'button') {
      dispatch(
        showPopup({
          title: 'Current user info',
          type: 'userInfo',
          props: {
            _id,
            firstName,
            lastName,
            email,
          },
        })
      );
    }
  };

  return (
    <TableRow key={_id} onClick={handleClick}>
      <TableCell width='80px'>
        <Avatar src={image} alt={firstName} />
      </TableCell>
      <TableCell>{firstName}</TableCell>
      <TableCell>{lastName}</TableCell>
      <TableCell>{email}</TableCell>
      <TableCell>{role}</TableCell>
      <TableCell>
        {createdAt && new Date(createdAt).toLocaleDateString()}
      </TableCell>
      <TableCell>
        {updatedAt ? new Date(updatedAt).toLocaleDateString() : 'Do not update'}
      </TableCell>
      <TableCell>
        <Stack direction='row' spacing={2}>
          <Button
            variant='outlined'
            color='secondary'
            onClick={() => deleteUser(_id)}
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
