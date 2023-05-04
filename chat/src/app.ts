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

import { chatRouter } from "./routes/chat";

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

app.use("/api/chat", chatRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
