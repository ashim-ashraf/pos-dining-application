import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { validateRequest, BadRequestError } from "@snackopedia/common";

import { Vendor } from "../models/vendor";

const router = express.Router();

router.post(
  "/api/vendors/signup",
  [
    body("name")
      .notEmpty()
      .matches(/[a-zA-Z][a-zA-Z ]+[a-zA-Z]$/)
      .withMessage("Name must be valid"),
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
    body("phone")
      .notEmpty()
      .matches(/^[0-9]{10}$/)
      .withMessage("Phone number must be valid"),
  ],
  async (req: Request, res: Response) => {
    const {
      name,
      restaurantName,
      description,
      address,
      liscenceNo,
      email,
      password,
      phone,
    } = req.body;

    const existingVendor = await Vendor.findOne({ email });

    if (existingVendor) {
      throw new BadRequestError("Email in use");
    }

    const existingPhone = await Vendor.findOne({ phone });

    if (existingPhone) {
      throw new BadRequestError("Phone number in use");
    }

    const vendor = Vendor.build({
      name,
      restaurantName,
      description,
      address,
      liscenceNo,
      email,
      password,
      phone,
    });
       console.log(vendor)
       try {
         await vendor.save();
        
       } catch (error) {
        console.log(error)
       }
    console.log("reached");
    console.log("reached end");
    res.status(201).send(vendor);
  }
);

export { router as signupRouter };
