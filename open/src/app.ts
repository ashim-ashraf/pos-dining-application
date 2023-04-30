import express from 'express';
import { Request, Response, NextFunction } from "express";
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { currentTable, errorHandler , NotFoundError } from '@snackopedia/common';
import { userRouter } from './routes/user';
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean')

const app = express();
app.use(cors());
app.set('trust proxy', true);
app.use(json());

//Data sanitization against NoSQL query injection 
app.use(mongoSanitize());

//Data Sanitization against site script XSS
app.use(xss())

app.use(
  cookieSession({
    signed: false,
  })
);

app.use(currentTable);
app.use("/api/users", userRouter)

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

// app.use((err: any, req: Request, res: Response, next: NextFunction) => {
//   console.log(err);
// });

app.use(errorHandler);

export {app} ;