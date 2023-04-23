import express from "express";
import { Request, Response, NextFunction } from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import {
  currentVendor,
  currentAdmin,
  errorHandler,
  NotFoundError,
} from "@snackopedia/common";

import { getVendorsRouter } from "./routes/get-vendors";
import { vendorRegistrationRouter } from "./routes/vendor-registration";
import { checkVendorRouter } from "./routes/check-vendor";
import { MenuRouter } from "./routes/create-menu";
import { publishVendorRouter } from "./routes/publish-vendor";
import { vendorRouter } from "./routes/vendor";
import { adminRouter } from "./routes/admin";
const cors = require("cors");
const https = require('https');

const app = express();
app.use(cors());
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
  })
);

app.use(currentVendor);
app.use(currentAdmin);
app.use(signinRouter);
app.use(checkVendorRouter);
app.use(MenuRouter);
app.use(vendorRegistrationRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(getVendorsRouter);
app.use(publishVendorRouter);

app.use("/api/vendors", vendorRouter);
app.use("/api/admin", adminRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
});

app.use(errorHandler);

export { app };
