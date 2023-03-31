import { requireVendorAuth } from "@snackopedia/common";
import express from "express";
import { TableBookedPublisher } from "../events/publishers/table-booked-publisher";
import { Vendor } from "../models/vendor";
import { natsWrapper } from "../nats-wrapper";


const router = express.Router();

router.get("/api/vendors/get-vendors", async (req, res) => {
   let vendors =  await Vendor.find()
    res.status(200).send(vendors)
});

export { router as getVendorsRouter };