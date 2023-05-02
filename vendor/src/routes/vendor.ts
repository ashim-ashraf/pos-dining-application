import express, { Request, Response } from "express";
import { Vendor } from "../models/vendor";
import { BadRequestError, requireVendorAuth } from "@snackopedia/common";
import {
  addCategory,
  checkVendor,
  checkVendorApproval,
  createMenuItem,
  deleteCategory,
  deleteS3image,
  editItem,
  editVendorRegistration,
  getAllTables,
  getAllVendors,
  getCategoryById,
  getMenuByVendorId,
  getVendorById,
  handleShopOpenStatus,
  listedVendor,
  manageOrderStatus,
  publishVendor,
  vendorRegistration,
  vendorSignin,
  vendorSignout,
  vendorSignup,
} from "../controller/vendor-controller";
import { test } from "../controller/admin-controller";

const upload = require("../middleware/upload");
const router = express.Router();

router.get("/get-tables", requireVendorAuth, getAllTables);

router.post("/signup", vendorSignup);

router.post("/signin", vendorSignin);

router.post("/registration", upload.single("image"), vendorRegistration);

router.post("/editregistration", upload.single("image"), editVendorRegistration )

router.post("/signout", vendorSignout);

router.get("/get-vendor/:id", getVendorById);

router.get("/vendor-approval/:restaurantId" ,test, checkVendorApproval)

router.get("/menu/:id", getMenuByVendorId);

router.post("/check-vendor", checkVendor);

router.post("/publish-vendors/:id", publishVendor);

router.put("/shop-status/:restaurantId", handleShopOpenStatus)

router.get("/get-vendors", getAllVendors);

router.get("/listed-restaurant/:id", listedVendor);

router.post("/create-menuItem", upload.single("image"), createMenuItem);

router.post("/edit-menuItem", test, upload.single("image"), editItem);

router.post("/category", addCategory);

router.get("/category/:id", getCategoryById);

router.delete("/categories/:userId/:categoryName", deleteCategory);

router.post("/manage-order-status", requireVendorAuth, manageOrderStatus);

router.post("/delete-image", deleteS3image)

export { router as vendorRouter };
