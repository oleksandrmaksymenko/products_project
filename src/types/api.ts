export type ApiUsersHeaderType = {
  headers: {
    total: number;
  };
};

export type ApiUsersType = {
  id: string;
  firstName: string;
  lastName: string;
  password: string;
  image: string;
  email: string;
  createdAt: string;
  updatedAt?: string;
};
