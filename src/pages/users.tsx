import styled from '@emotion/styled';
import React from 'react';
import {useDispatch} from 'react-redux';
import {userApi} from 'src/api';
import {checkSession} from 'src/checkSession';
import type {NextPageContext} from 'next';
import UserModal from 'src/components/UserModal';
import UserTable, {PickUserDataType} from 'src/components/UserTable';
import {clearPopup, showPopup} from 'src/store/reducers/popup';
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

const Users: React.FC<UserProps> = ({users}) => {
  const [filter, setFilter] = React.useState('');
  const [usersData, setUsersData] = React.useState<ApiUsersType[]>(users);
  const [isModalShow, setIsModalShow] = React.useState(false);
  const [user, setUser] = React.useState<PickUserDataType>({
    firstName: '',
    lastName: '',
    email: '',
    id: '',
  });

  const dispatch = useDispatch();

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

  const hide = () => {
    dispatch(clearPopup());
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

export async function getServerSideProps(context: NextPageContext) {
  const users = await userApi.getUsers();
  return await checkSession(context, '', '', false, {
    users: users.data || [],
  });
}

export default Users;
