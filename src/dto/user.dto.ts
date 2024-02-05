export type OUser = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};

export type IUser = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

export type DUser = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};
