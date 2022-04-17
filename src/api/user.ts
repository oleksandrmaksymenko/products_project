import {api} from 'src/api/index';
import {ApiUsersHeaderType, ApiUsersType} from 'src/types/api';

type GetUsersType = Record<'data', ApiUsersType[]> & ApiUsersHeaderType;

export const getUsers = async (total?: number): Promise<GetUsersType> =>
  await api.get(`/users${total ? '?total=' + total : ''}`);

export const editUser = async (user: ApiUsersType): Promise<ApiUsersType> => {
  const patchUser = await api.patch(`/users/${user.id}`, {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    password: user.password,
    image: user.image,
    updatedAt: Date.now(),
  });

  return patchUser.data;
};

export const deleteUser = async (id: string) =>
  await api.delete(`/users/${id}`);
