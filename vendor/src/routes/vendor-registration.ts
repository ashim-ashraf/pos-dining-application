import express, { Request, Response } from "express";
import { validateRequest, BadRequestError } from "@snackopedia/common";
import { Vendor } from "../models/vendor";
import { getVendorsRouter } from "./get-vendors";

const upload = require("../middleware/upload");
const router = express.Router();

router.post(
  "/api/vendors/registration",
  upload.array("image"),

  async (req: Request, res: Response) => {
    const {
      address,
      description,
      email,
      liscenceNo,
      restaurantPhone,
      pincode,
      restaurantName,
      restaurantType,
      state,
      userId,
      workingDays,
      openingTime,
      closingTime,
    } = req.body;


    interface FileObject extends Express.Multer.File {
      location: string;
    }

    
    const file = req.file as FileObject;
    const image : string = file.location;

    const pincodeNumber = parseInt(pincode);
    const restaurantPhoneNumer = parseInt(restaurantPhone);
    const liscenceNoNumber = parseInt(liscenceNo);

    let updatedDoc = await Vendor.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          address,
          description,
          email,
          liscenceNo: liscenceNoNumber,
          restaurantPhone: restaurantPhoneNumer,
          pincode: pincodeNumber,
          restaurantName,
          restaurantType,
          state,
          image,
          workingDays,
          openingTime,
          closingTime,
        },
      },
      { new: true }
    );

    console.log(updatedDoc);

    if(updatedDoc?.restaurantName){
      res.status(200).send(updatedDoc);
    }else {
      res.status(400).send({success:false})
    }
  }
);

export { router as vendorRegistrationRouter };
