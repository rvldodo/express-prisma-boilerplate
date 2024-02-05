import * as jwt from "jsonwebtoken";
import { OUser } from "../dto/user.dto";
import { SECRET_TOKEN } from "../secret";

type DecodeToken = {
  id: string;
  email: string;
};

export const jwtToken = async (user: OUser) => {
  const payload = {
    id: user?.id,
    email: user?.email,
  };

  // TODO: for production need to add expired
  return jwt.sign(payload, SECRET_TOKEN as string);
};

export const decodeToken = async (token: string) => {
  const decode = jwt.verify(token, SECRET_TOKEN as string) as DecodeToken;
  return decode;
};
