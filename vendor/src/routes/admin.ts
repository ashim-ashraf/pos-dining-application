import express, { Request, Response } from "express";
import { body } from "express-validator";
import { Password } from "../services/password";
import {
  AdminVerify,
  addBanner,
  addTable,
  adminSignin,
  deleteTableById,
  getAllTables,
  getBanners,
  getVendors,
  test,
  validateAdminSignin,
  vendorApproval,
} from "../controller/admin-controller";
import {  requireAdminAuth, validateRequest } from "@snackopedia/common";

const upload = require("../middleware/upload");
const router = express.Router();

router.get("/admin-verify", requireAdminAuth, AdminVerify);

router.post("/signin", validateAdminSignin , validateRequest , adminSignin );

router.post("/add-table",  requireAdminAuth, addTable);

router.get("/get-tables", requireAdminAuth, getAllTables)

router.delete("/delete-table/:id",requireAdminAuth, deleteTableById)

router.get("/get-vendors",  requireAdminAuth, getVendors )

router.put("/vendor-approval/:id",requireAdminAuth, vendorApproval)

router.post("/create-banner" , requireAdminAuth,upload.single("image"), addBanner)

router.get("/get-banners",test, getBanners)


export { router as adminRouter };
