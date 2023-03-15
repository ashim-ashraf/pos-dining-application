import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { validateRequest, BadRequestError } from "@snackopedia/common";

import { User } from "../models/user";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("name").notEmpty().matches(/[a-zA-Z][a-zA-Z ]+[a-zA-Z]$/).withMessage("Name must be valid"),
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
    body('phone')
      .notEmpty()
      .matches(/^[0-9]{10}$/)
      .withMessage("Phone number must be valid")
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { name, email, password, phone } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError("Email in use");
    }

    const existingPhone = await User.findOne({ phone });

    if(existingPhone){
      throw new BadRequestError("Phone number in use")
    }

    const user = User.build({ name, email, password, phone });
    await user.save();

    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!
    );

    // Store it on session object
    req.session = {
      jwt: userJwt,
    };

    
    res.status(201).send(user);
  }
);

export { router as signupRouter };
