import {ObjectId} from 'mongodb';
import {api} from 'src/api/index';
import {ApiUsersHeaderType, ApiUsersType} from 'src/types/api';

type GetUsersType = Record<'data', ApiUsersType[]> & ApiUsersHeaderType;

export const getUsers = async (total?: number): Promise<GetUsersType> =>
  await api.get(`/users${total ? '?total=' + total : ''}`);

export const editUser = async (user: ApiUsersType): Promise<ApiUsersType> => {
  const patchUser = await api.patch(`/users`, {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    password: user.password,
    image: user.image,
    updatedAt: Date.now(),
    _id: new ObjectId(user.id),
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
