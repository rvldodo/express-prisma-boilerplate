import { User } from "@prisma/client";

export type TUser = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};
