import {api} from 'src/api/index';
import {ApiUsersHeaderType, ApiUsersType} from 'src/types/api';

type GetUsersType = Record<'data', ApiUsersType[]> & ApiUsersHeaderType;

export const getUsers = async (): Promise<GetUsersType> =>
  await api.get(`/users`);

export const getUser = async (id: string): Promise<ApiUsersType> =>
  await api.get(`/users?user_id=${id}`);

export const createUser = async (
  user: Pick<ApiUsersType, 'firstName' | 'lastName' | 'email' | '_id'>
) =>
  await api.post('/users', {
    ...user,
    id: user._id,
    image: '',
    createdAt: Date.now(),
  });

export const deleteUser = async (id: string) =>
  await api.delete(`/users`, {
    data: {id},
  });

export const updateUser = async (user: ApiUsersType): Promise<ApiUsersType> => {
  const patchUser = await api.patch(`/users`, {
    ...user,
    id: user._id,
    updatedAt: Date.now(),
  });

  return patchUser.data;
};
