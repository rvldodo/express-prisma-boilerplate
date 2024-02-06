import express from "express";
import { TUser } from "./users.type";

declare module "express" {
  export interface Request {
    user: TUser;
  }
}
