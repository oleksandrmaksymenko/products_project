import styled from '@emotion/styled';
import React from 'react';
import {userApi} from 'src/api';
import {checkSession} from 'src/checkSession';
import type {GetServerSidePropsContext} from 'next';
import UserTable, {PickUserDataType} from 'src/components/UserTable';
import {wrapper} from 'src/store';
import {useAppDispatch, useAppSelector} from 'src/store/hooks';
import {showPopup} from 'src/store/reducers/popup';
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
  InputAdornment,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddSharpIcon from '@mui/icons-material/AddSharp';

type UserProps = Record<'users', ApiUsersType[]>;

const StackContainer = styled.div`
  margin-bottom: 16px;
`.withComponent(Stack);

const UsersContainer = styled.div`
  width: 100vw;
  max-width: 1200px;
`;

const FilterUserContainer = styled.div`
  margin-bottom: 16px;
`.withComponent(Stack);

const FilteredButton = styled.button`
  &.active {
    box-shadow: -1px 1px 9px 0 rgb(29 138 201);
  }
`.withComponent(Button);

const usersFilterList = (activeButton: string) => [
  {
    id: 1,
    className: activeButton === '' ? 'active' : '',
    filterBy: '',
    text: 'All users',
  },
  {
    id: 2,
    className: activeButton === 'customer' ? 'active' : '',
    filterBy: 'customer',
    text: 'Customer',
  },
  {
    id: 3,
    className: activeButton === 'user' ? 'active' : '',
    filterBy: 'user',
    text: 'User',
  },
];

const Users: React.FC<UserProps> = () => {
  const users = useAppSelector(store => store.users);
  const [filter, setFilter] = React.useState('');
  const [usersData, setUsersData] = React.useState<ApiUsersType[]>([]);
  const [activeButton, setActiveButton] = React.useState('');

  const dispatch = useAppDispatch();

  const filterUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
    const filteredUsers: ApiUsersType[] = users.filter(user => {
      const userData = `${user.lastName.toLocaleLowerCase()}${user.firstName.toLocaleLowerCase()}${user.email.toLocaleLowerCase()}`;

      return userData.includes(filter);
    });

    setUsersData(filteredUsers);
  };

  const createUser = () => {
    dispatch(
      showPopup({
        type: 'createUser',
        title: 'Create User',
      })
    );
  };

  const filterUserByRole = (role: string) => {
    const filteredUsers: ApiUsersType[] = users.filter(user =>
      user.role.includes(role)
    );

    setActiveButton(role);
    setUsersData(filteredUsers);
  };

  return (
    <UsersContainer>
      <StackContainer
        direction='row'
        justifyContent='space-between'
        alignItems='stretch'
      >
        <Typography variant='h5' color='primary'>
          Users Management
        </Typography>
        <Button
          onClick={createUser}
          color='secondary'
          variant='contained'
          startIcon={<AddSharpIcon sx={{color: '#fff'}} />}
        >
          Create User
        </Button>
      </StackContainer>
      <FilterUserContainer
        direction='row'
        justifyContent='flex-start'
        spacing={2}
      >
        {usersFilterList(activeButton).map(item => (
          <FilteredButton
            key={item.id}
            size='small'
            variant='contained'
            color='secondary'
            onClick={() => filterUserByRole(item.filterBy)}
            className={item.className}
          >
            {item.text}
          </FilteredButton>
        ))}
      </FilterUserContainer>
      <TableContainer component={Paper}>
        <TextField
          onChange={filterUser}
          label='Search user'
          size='small'
          sx={{width: 'calc(100% - 32px)', margin: '16px'}}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        {!!usersData.length && (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Avatar</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
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
                  {...{setUsersData}}
                  {...{usersData}}
                />
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </UsersContainer>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  store => async (context: GetServerSidePropsContext) => {
    // try {
    //   const {data} = await userApi.getUsers();
    //   store.dispatch(getUsers(data));
    // } catch (e) {
    //   console.log(e);
    // }
    return await checkSession(context, '', '', false);
  }
);

export default Users;
