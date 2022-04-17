import styled from '@emotion/styled';
import React from 'react';
import {userApi} from 'src/api';
import {checkSession} from 'src/checkSession';
import type {GetServerSidePropsContext, PreviewData} from 'next';
import UserModal from 'src/components/UserModal';
import UserTable, {PickUserDataType} from 'src/components/UserTable';
import {wrapper} from 'src/store';
import {useAppDispatch, useAppSelector} from 'src/store/hooks';
import {clearPopup, showPopup} from 'src/store/reducers/popup';
import {getUsers} from 'src/store/reducers/users';
import type {ApiUsersType} from 'src/types/api';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Stack,
  Button,
} from '@mui/material';

type UserProps = Record<'users', ApiUsersType[]>;

const StackContainer = styled.div`
  margin-bottom: 16px;
`.withComponent(Stack);

const Users: React.FC<UserProps> = () => {
  const users = useAppSelector(store => store.users);
  const [filter, setFilter] = React.useState('');
  const [usersData, setUsersData] = React.useState<ApiUsersType[]>(users);
  const [isModalShow, setIsModalShow] = React.useState(false);
  const [user, setUser] = React.useState<PickUserDataType>({
    firstName: '',
    lastName: '',
    email: '',
    id: '',
  });

  const dispatch = useAppDispatch();

  const filterUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
    const filteredUsers: ApiUsersType[] = users.filter(user => {
      const userData = `${user.lastName.toLocaleLowerCase()}${user.firstName.toLocaleLowerCase()}${user.email.toLocaleLowerCase()}`;

      return userData.includes(filter);
    });

    setUsersData(filteredUsers);
  };

  const handleClose = () => {
    setIsModalShow(false);
  };

  const createUser = () => {
    dispatch(
      showPopup({
        type: 'createUser',
        title: 'Create User',
      })
    );
  };

  const saveUserData = async (userData: any) => {
    try {
      if (user) {
        const updatedUserData = await userApi.editUser(
          userData as ApiUsersType
        );
        const updatedUsers = usersData.map(user =>
          user.id === updatedUserData.id
            ? {...user, ...updatedUserData}
            : {...user}
        );

        setUsersData(updatedUsers);
        setIsModalShow(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div>
        <UserModal
          {...{isModalShow}}
          {...{handleClose}}
          {...{saveUserData}}
          {...{user}}
        />
        <StackContainer
          direction='row'
          justifyContent='space-between'
          alignItems='stretch'
        >
          <TextField
            onChange={filterUser}
            label='User text'
            size='small'
            variant='filled'
          />
          <Button onClick={createUser} color='secondary'>
            Create User
          </Button>
        </StackContainer>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Avatar</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Updated At</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {usersData.map(user => (
                <UserTable
                  key={user.id}
                  {...user}
                  {...{setUser}}
                  {...{setIsModalShow}}
                  {...{setUsersData}}
                  {...{usersData}}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  store => async (context: GetServerSidePropsContext) => {
    const {data} = await userApi.getUsers();
    store.dispatch(getUsers(data));

    return await checkSession(context, '', '', false);
  }
);

export default Users;
