import express from 'express';
import { Request, Response, NextFunction } from "express";
import 'express-async-errors';
import { json } from 'body-parser';

import cookieSession from 'cookie-session';

import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';

import { currentVendor, errorHandler , NotFoundError } from '@snackopedia/common';

import { getVendorsRouter } from './routes/get-vendors';
import { vendorRegistrationRouter } from './routes/vendor-registration';
import { checkVendorRouter } from './routes/check-vendor';
import { MenuRouter } from './routes/create-menu';
const cors = require('cors');

const app = express();
app.use(cors());
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: true
  })
);

app.use(signupRouter)
app.use(signinRouter)
app.use(currentVendor);
app.use(checkVendorRouter)
app.use(MenuRouter);
app.use(vendorRegistrationRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(getVendorsRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
});

app.use(errorHandler);

export {app} ;