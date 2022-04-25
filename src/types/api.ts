export type ApiUsersHeaderType = {
  headers: {
    total: number;
  };
};

export type AddressType = {
  type: string;
  street: string;
  house: string;
  apt: string;
  comment: string;
};

export type UserAddressType = {
  main: AddressType;
  second?: AddressType;
};

export type ApiUsersType = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  role: string;
  address: UserAddressType;
  createdAt?: string;
  updatedAt?: string;
};

export type ApiProductsType = {
  _id: string;
  name: string;
  description: string;
  image: string;
  price: string;
};
