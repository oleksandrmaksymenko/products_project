import {api} from 'src/api/index';
import {ApiUsersHeaderType, ApiUsersType} from 'src/types/api';

type GetUsersType = Record<'data', ApiUsersType[]> & ApiUsersHeaderType;

export const getUsers = async (total?: number): Promise<GetUsersType> =>
  await api.get(`/users${total ? '?total=' + total : ''}`);

export const editUser = async (user: ApiUsersType): Promise<ApiUsersType> => {
  const patchUser = await api.patch(`/users`, {
    ...user,
    updatedAt: Date.now(),
  });

  return patchUser.data;
};

export const deleteUser = async (id: string) =>
  await api.delete(`/users`, {
    data: {id},
  });

export const createUser = async (
  user: Pick<ApiUsersType, 'firstName' | 'lastName' | 'email'>
) =>
  await api.post('/users', {
    ...user,
    image: '',
    createdAt: Date.now(),
  });

export const getUser = async (id: string): Promise<ApiUsersType> =>
  await api.get(`/users?user_id=${id}`);
