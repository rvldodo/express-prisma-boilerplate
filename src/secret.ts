import dotenv from "dotenv";
dotenv.config({ path: ".env" });

export const PORT = process.env.PORT;
export const SECRET_TOKEN = process.env.SECRET_TOKEN;
export const SESSION_SECRET = process.env.SESSION_SECRET;
