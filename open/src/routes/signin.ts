import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { validateRequest , BadRequestError } from "@snackopedia/common";

import { Password } from "../services/password";
import { User } from "../models/user";


const router = express.Router();


export { router as signinRouter };
