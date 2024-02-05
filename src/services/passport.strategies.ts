import { Request } from "express";
import passport from "passport";
import { Strategy as localStrategy } from "passport-local";
import { IUser, OUser } from "../dto/user.dto";
import { hashPassword } from "../utils/bcrypt";
import userRepo from "../repository/user.repo";
import { loginPassport, signupPassport } from "./passport.utils";

passport.use(
  "signup",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, next) => {
      return await signupPassport(req?.body, next);
    },
  ),
);

passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, next) => {
      return await loginPassport(req?.body, next);
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user: OUser, done) => {
  done(null, user);
});

export default passport;
