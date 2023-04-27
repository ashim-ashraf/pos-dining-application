import express, { Request, Response } from "express";
import { Vendor } from "../models/vendor";
import { BadRequestError, requireVendorAuth } from "@snackopedia/common";
import {
  addCategory,
  checkVendor,
  createMenuItem,
  deleteCategory,
  editItem,
  getAllTables,
  getAllVendors,
  getCategoryById,
  getMenuByVendorId,
  getVendorById,
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

router.post("/registration", upload.array("image"), vendorRegistration);

router.post("/signout", vendorSignout);

router.get("/get-vendor/:id", getVendorById);

router.get("/menu/:id", getMenuByVendorId);

router.post("/check-vendor", checkVendor);

router.get("/publish-vendors/:id", publishVendor);

router.get("/get-vendors", getAllVendors);

router.get("/listed-restaurant/:id", listedVendor);

router.post("/create-menuItem", upload.single("image"), createMenuItem);

router.post("/edit-menuItem", test, upload.single("image"), editItem);

router.post("/category", addCategory);

router.get("/category/:id", getCategoryById);

router.delete("/categories/:userId/:categoryName", deleteCategory);

router.post("/manage-order-status", requireVendorAuth, manageOrderStatus);

export { router as vendorRouter };
