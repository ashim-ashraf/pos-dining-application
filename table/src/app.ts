import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import { currentUserRouter } from './routes/test';

import cookieSession from 'cookie-session';

import { errorHandler , NotFoundError } from '@snackopedia/common';
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


app.use(currentUserRouter)

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export {app} ;