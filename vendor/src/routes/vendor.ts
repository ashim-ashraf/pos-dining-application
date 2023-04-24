import express ,{Request, Response } from "express"
import { Vendor } from "../models/vendor";
import { BadRequestError, requireVendorAuth } from "@snackopedia/common";
import jwt from "jsonwebtoken";
import { getAllTables, manageOrderStatus } from "../controller/vendor-controller";
import { test } from "../controller/admin-controller";


const upload = require("../middleware/upload");
const router = express.Router();

router.get("/get-tables", requireVendorAuth, getAllTables)

router.post(
    "/signup",
  
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

  router.post('/check-vendor' , async (req,res) => {
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

// router.post('/edit-menuItem',test, upload.array("image"),)

router.post('/manage-order-status', requireVendorAuth, manageOrderStatus)




export { router as vendorRouter };