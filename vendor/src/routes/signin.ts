import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { validateRequest , BadRequestError } from "@snackopedia/common";

import { Password } from "../services/password";
import { Vendor } from "../models/vendor";


const router = express.Router();

router.post(
  "/api/vendors/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("You must supply a password"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    
    const { email, password } = req.body;

    const existingVendor = await Vendor.findOne({ email });
    if (!existingVendor) {
      throw new BadRequestError('Invalid Credentials')
    }

    if(existingVendor.vendorStatus === false){
      throw new BadRequestError('Invalid Credentials')
    }

    const passwordMatch = await Password.compare(
      existingVendor.password,
      password
    );

    if (!passwordMatch) {
     throw new BadRequestError('Invalid Credentials');  
    }

    // Generate JWT
    const vendorJwt = jwt.sign(
      {
        id: existingVendor.id,
        email: existingVendor.email,
      },
      process.env.JWT_VENDOR_KEY!
    );

    // Store it on session object
    req.session = {
      jwt: vendorJwt,
    };

    res.status(201).send(existingVendor);

  }
);

export { router as signinRouter };
