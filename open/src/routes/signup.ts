import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { validateRequest, BadRequestError } from "@snackopedia/common";

import { User } from "../models/user";
import { UserCreatedPublisher } from "../events/publisher/user-created-publisher";
import { natsWrapper } from "../nats-wrapper";

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

    const userDetails = await User.findOne({ name });

    if (userDetails) {
      try {
        console.log("user created publisher from auth service")
        await new UserCreatedPublisher(natsWrapper.client).publish({
          id: userDetails._id,
          name: userDetails.name,
          email: userDetails.email,
          password: userDetails.password,
          phone: userDetails.phone,
          status: userDetails.status,
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log(`User not found.`);
    }
    
    res.cookie("accesstoken",userJwt)
    res.status(201).send(user);
  }
);

export { router as signupRouter };
