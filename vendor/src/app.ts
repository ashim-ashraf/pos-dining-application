import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';

import cookieSession from 'cookie-session';


import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';

import { currentVendor, errorHandler , NotFoundError } from '@snackopedia/common';
import { tablebookingrouter } from './routes/create-menu';
import { getVendorsRouter } from './routes/get-vendors';
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

app.use(currentVendor);
app.use(tablebookingrouter);
app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(getVendorsRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export {app} ;