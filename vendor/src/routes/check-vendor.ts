import express from "express";
import { Vendor } from "../models/vendor";
import { BadRequestError } from "@snackopedia/common";
import e from "express";

const router = express.Router()

// checks if a vedor exist or not

router.post('/api/vendors/check-vendor' , async (req,res) => {
    const { phone } = req.body;
    console.log('check vendor route called ' , phone)

    let existingVendor = await Vendor.findOne({ phone });
    if (!existingVendor) {
        console.log("inside reject");
        res.status(400).send({
            errors: [{ message: 'Account not found' }]
          });
    } else {
        console.log(existingVendor);
        res.status(201).send(existingVendor);
    }

})

router.get('/api/vendors/listed-restaurant' , async (req,res) => {
    const { userId } = req.body;
    console.log(userId)
    const vendorDetails = await Vendor.findOne({ userId})
    if(vendorDetails?.vendorStatus){
        res.status(200).send(vendorDetails)
    } else {
        res.status(400);
    }
})

export {router as checkVendorRouter}