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
    } = req.body;

    interface FileObject {
      location: string;
      // add other properties as needed
    }
    
    const files = req.files;
let image: { location: string }[] = [];

if (Array.isArray(files)) {
  image = files.map((file) => ({ location: (file as any).location }));
} else if (files && typeof files === 'object') {
  const keys = Object.keys(files);
  image = keys.flatMap((key) => files[key].map((file) => ({ location: (file as any).location })));
}

console.log(image)
    
  
   
    

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
          image
        },
      },
      { new: true } 
    );

    console.log(updatedDoc)

    // res.status(201)
  }
);

export { router as vendorRegistrationRouter };
