import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import {
  errorHandler,
  NotFoundError,
} from "@snackopedia/common";
import { chatRouter } from "./routes/chat";

const logger = require("morgan");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");

const app = express();
app.use(logger("dev"));
const cors = require("cors");
const http = require("http");
const server = http.createServer(app);

app.use(cors());
app.set("trust proxy", true);
app.use(json());
app.use(mongoSanitize());
app.use(xss());

app.use(
  cookieSession({
    signed: false,
  })
);

app.use("/api/chat", chatRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app, server };
