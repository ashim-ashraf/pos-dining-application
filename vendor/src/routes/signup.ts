import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { validateRequest, BadRequestError } from "@snackopedia/common";

import { Vendor } from "../models/vendor";

const router = express.Router();

router.post(
  "/api/vendors/signup",

  async (req: Request, res: Response) => {
    const { userName, user } = req.body;

    console.log(user.phoneNumber, userName);

    let name = userName;
    let phone = user.phoneNumber;

    const vendor = Vendor.build({
      name,
      phone,
    });

    console.log(vendor);

    let existingVendor = await Vendor.findOne({ phone });
    if (existingVendor) {
      throw new BadRequestError("Phone number in use")
    }

    var newVendor = await vendor.save();
      
    // Generate JWT
    if(newVendor){
      const vendorJwt = jwt.sign(
        {
          id: newVendor.id,
          phone: newVendor.phone,
        },
        process.env.JWT_VENDOR_KEY!
      );

      req.session = {
        jwt: vendorJwt,
      };

    }

    const vendorDetails = {
      vendorStatus: newVendor.vendorStatus,
      name: newVendor.name,
      phone: newVendor.phone,
      id:newVendor._id,
    };
      
    res.status(201).send(vendorDetails);
  }
);

export { router as signupRouter };
