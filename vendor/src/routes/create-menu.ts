import { requireVendorAuth } from "@snackopedia/common";
import express from "express";
import { TableBookedPublisher } from "../events/publishers/table-booked-publisher";
import { natsWrapper } from "../nats-wrapper";


const router = express.Router();

router.get("/api/vendors/booktable", requireVendorAuth, async (req, res) => {
    console.log('bookatable route called')

    let table = req.body; 
    console.log(table)
    try{
        await new TableBookedPublisher(natsWrapper.client).publish({
            tableid: table.a,
            tableNo: table.b,
            userId: table.c
        })
    } catch (error) {
        console.log(error);
    }

    console.log('published')
  
    res.sendStatus (200)
  
});

export { router as tablebookingrouter };

