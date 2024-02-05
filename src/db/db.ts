import { PrismaClient } from "@prisma/client";
import { SignupSchema } from "../schema/user";

export const db = new PrismaClient({
  log: ["query"],
});
