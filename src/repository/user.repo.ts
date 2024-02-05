import { db } from "../db/db";
import { IUser } from "../dto/user.dto";

const createUser = async (data: IUser) => {
  return await db.user.create({ data });
};

const findByQuery = async (query = {}) => {
  return await db.user.findFirst({ where: query });
};

const findAllUsers = async (limit: number, page: number, query = {}) => {
  return await db.user.findMany({ take: limit, skip: page, where: query });
};

export default { createUser, findByQuery, findAllUsers };
