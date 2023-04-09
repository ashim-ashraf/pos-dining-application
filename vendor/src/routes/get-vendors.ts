import express from "express";
import { Vendor } from "../models/vendor";

const router = express.Router();

// to list all the vendors

router.get("/api/vendors/get-vendors", async (req, res) => {
  let vendors = await Vendor.find();
  res.status(200).send(vendors);
});

router.get("/api/vendors/get-vendor/:id", async (req, res) => {
  console.log("get details called");
  const vendorId = req.params.id;

  const vendorDetails = await Vendor.findOne({ _id: vendorId });
  const menu = vendorDetails?.menu 

  if (vendorDetails) {
    res.status(200).send({vendorDetails,menu});
  } else {
    res.status(400).send({ success: false });
  }
});

router.get('/api/vendors/listed-restaurant/:id' , async (req,res) => {
    const  vendorId  = req.params.id;
    console.log(vendorId)
    const vendorDetails = await Vendor.findOne({ _id: vendorId})
    console.log(vendorDetails)
    if(vendorDetails?.restaurantName){
        res.status(200).send(vendorDetails)
    } else {
        res.status(400);
    }
})

export { router as getVendorsRouter };
