import styled from '@emotion/styled';
import React from 'react';
import {userApi} from 'src/api';
import {createUser} from 'src/api/user';
import {checkSession} from 'src/checkSession';
import type {GetServerSidePropsContext} from 'next';
import ListHead from 'src/components/List/Head';
import Pagination from 'src/components/List/Pagination';
import Search from 'src/components/List/Search';
import TableTopBar from 'src/components/List/TableTopBar';
import UserTable from 'src/components/User/Table';
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
  Button,
} from '@mui/material';
import {StackContainer, ListContainer} from 'src/ui';

type UserProps = Record<'users', ApiUsersType[]>;

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
  const [filter, setFilter] = React.useState(' ');
  const [usersData, setUsersData] = React.useState<ApiUsersType[]>(users);
  const [activeButton, setActiveButton] = React.useState('');
  const [page, setPage] = React.useState(0);

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

  console.log(usersData);

  return (
    <ListContainer>
      <TableTopBar
        handleClick={createUser}
        title='Users Management'
        type='User'
      />
      <StackContainer direction='row' justifyContent='flex-start' spacing={2}>
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
      </StackContainer>
      <Pagination page={page} setPage={setPage} pageCount={usersData.length} />
      <TableContainer component={Paper}>
        <Search onChange={filterUser} label='Search user' />
        {!!usersData.length && (
          <Table>
            <ListHead
              head={[
                // TODO: this should place into db
                'Avatar',
                'First Name',
                'Last Name',
                'Email',
                'Role',
                'Created At',
                'Updated At',
                '',
              ]}
            />
            <TableBody>
              {usersData
                .slice(
                  filter === '' ? 0 : page * 10,
                  filter === '' ? 10 : page * 10 + 10
                )
                .map(user => (
                  <UserTable
                    key={user._id}
                    {...user}
                    {...{setUsersData}}
                    {...{usersData}}
                  />
                ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </ListContainer>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  store => async (context: GetServerSidePropsContext) => {
    try {
      const {data} = await userApi.getUsers();
      store.dispatch(getUsers(data));
    } catch (e) {
      console.log(e);
    }
    return await checkSession(context, '', '', false);
  }
);

export default Users;
