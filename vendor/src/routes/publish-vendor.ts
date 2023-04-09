import express from "express";
import { Vendor } from "../models/vendor";
import { VendorPublisher } from "../events/publishers/vendor-publisher";
import { natsWrapper } from "../nats-wrapper";



const router = express.Router();

// to list all the vendors

router.get("/api/vendors/publish-vendors/:id", async (req, res) => {
    console.log("publish vendor route called")
   const vendorId = req.params.id;

    const vendor = await Vendor.findOne({ _id: vendorId });
    if (!vendor) {
      return res.status(400).send({ error: "Vendor not found" });
    }

    try {
      console.log("publisher reached")
        await new VendorPublisher(natsWrapper.client).publish({
            id:vendor._id,
            name: vendor.name,
            restaurantName: vendor.restaurantName,
            description: vendor.description,
            restaurantAddress: vendor.restaurantAddress,
            email: vendor.email,
            phone: vendor.phone,
            liscenceNo: vendor.liscenceNo,
            vendorStatus: vendor.vendorStatus,
            image: vendor.image,
            restaurantType: vendor.restaurantType,
            restaurantPhone: vendor.restaurantPhone,
            category: vendor.category,
            menu: vendor.menu,
          });
    } catch (error) {
        console.log("publish failed", error);
    }
    
  res.status(200);
    
});

export { router as publishVendorRouter };