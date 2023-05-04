import express from "express";
import { Request, Response, NextFunction } from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";

const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean')

import {
  currentVendor,
  currentAdmin,
  errorHandler,
  NotFoundError,
} from "@snackopedia/common";


import { vendorRouter } from "./routes/vendor";
import { adminRouter } from "./routes/admin";
const cors = require("cors");
const https = require('https');

const app = express();
app.use(cors());
app.set("trust proxy", true);
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

app.use(currentVendor);
app.use(currentAdmin);

app.use("/api/vendors", vendorRouter);
app.use("/api/admin", adminRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

// app.use((err: any, req: Request, res: Response, next: NextFunction) => {
//   console.log(err);
// });

app.use(errorHandler);

export { app };
