import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { validateRequest , BadRequestError } from "@snackopedia/common";
import { Password } from "../services/password";
import { Vendor } from "../models/vendor";


const router = express.Router();

router.post(
  "/api/vendors/signin",

  async (req: Request, res: Response) => {
    
    const { user } = req.body;
    console.log(user.phoneNumber);

    let phone = user.phoneNumber;
    let existingVendor = await Vendor.findOne({ phone });
    if (!existingVendor) {
      throw new BadRequestError("User not found")
    }

    // Generate JWT

      const vendorJwt = jwt.sign(
        {
          id: existingVendor.id,
          phone: existingVendor.phone,
        },
        process.env.JWT_VENDOR_KEY!
      );

      req.session = {
        Vendorjwt: vendorJwt,
      };

      res.status(201).send(existingVendor);
    }
);

export { router as signinRouter };
