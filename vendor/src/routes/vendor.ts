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
  getAllOrders,
  getAllTables,
  getAllVendors,
  getCategoryById,
  getMenuByVendorId,
  getTableById,
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

router.get("/get-table/:id",requireVendorAuth, getTableById );

router.post("/signup", vendorSignup);

router.post("/signin", vendorSignin);

router.post("/signout", vendorSignout);

router.post("/registration",requireVendorAuth, upload.single("image"), vendorRegistration);

router.post("/editregistration",requireVendorAuth, upload.single("image"), editVendorRegistration )

router.get("/get-vendor/:id", getVendorById);

router.get("/vendor-approval/:restaurantId",requireVendorAuth, checkVendorApproval)

router.get("/menu/:id",requireVendorAuth, getMenuByVendorId);

router.post("/check-vendor", checkVendor);

router.post("/publish-vendors/:id",requireVendorAuth, publishVendor);

router.put("/shop-status/:restaurantId",requireVendorAuth, handleShopOpenStatus)

router.get("/get-vendors", getAllVendors);

router.get("/listed-restaurant/:id", listedVendor);

router.post("/create-menuItem",requireVendorAuth, upload.single("image"), createMenuItem);

router.post("/edit-menuItem", requireVendorAuth, upload.single("image"), editItem);

router.post("/category",requireVendorAuth, addCategory);

router.get("/category/:id",requireVendorAuth, getCategoryById);

router.delete("/categories/:userId/:categoryName",requireVendorAuth, deleteCategory);

router.post("/manage-order-status", requireVendorAuth, manageOrderStatus);

router.post("/delete-image",requireVendorAuth, deleteS3image)

router.get('/get-orders/:id',requireVendorAuth, getAllOrders)

export { router as vendorRouter };
