import express from 'express';
import { Request, Response, NextFunction } from "express";
import 'express-async-errors';
import { json } from 'body-parser';

import cookieSession from 'cookie-session';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler , NotFoundError } from '@snackopedia/common';
import { getUsersRouter } from './routes/get-users';
import { userRouter } from './routes/user';
const cors = require('cors');

const app = express();
app.use(cors());
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
  })
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);
app.use(getUsersRouter)

app.use("/api/users", userRouter)

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
});

app.use(errorHandler);

export {app} ;