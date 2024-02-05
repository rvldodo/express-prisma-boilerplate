import express, { Request, Response, Express } from "express";
import logger from "./utils/logger";
import { PORT, SESSION_SECRET } from "./secret";
import { db } from "./db/db";
import morgan from "morgan";
import session from "express-session";
import bodyParser from "body-parser";
import router from "./api/index";

// import passport
import passportStrategies from "./services/passport.strategies";
import { errorMiddleware } from "./middlewares/error";

const app: Express = express();

// session
app.use(
  session({
    secret: SESSION_SECRET as string,
    resave: false,
    saveUninitialized: true,
  }),
);
// body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passportStrategies.initialize());
app.use(morgan("dev"));

app.use("/v1", router);

app.use(errorMiddleware);

app.listen(PORT, async () => {
  logger.info(`Server running on port ${PORT}`);
  await db.$connect();
  logger.info("Database connected");
});
