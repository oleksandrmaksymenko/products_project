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
  address: {
    main: AddressType;
    second: AddressType;
  };
};

export type ApiUsersType = {
  id: string;
  firstName: string;
  lastName: string;
  password: string;
  image: string;
  email: string;
  role: string;
  address: UserAddressType;
  createdAt: string;
  updatedAt?: string;
};
