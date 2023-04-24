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
  getVendors,
  test,
  validateAdminSignin,
  vendorApproval,
} from "../controller/admin-controller";
import {  requireAdminAuth, validateRequest } from "@snackopedia/common";

const router = express.Router();

router.get("/admin-verify", requireAdminAuth, AdminVerify);

router.post("/signin", validateAdminSignin, validateRequest , adminSignin );

router.post("/add-table",  requireAdminAuth, addTable);

router.get("/get-tables", requireAdminAuth, getAllTables)

router.delete("/delete-table/:id",requireAdminAuth, deleteTableById)

router.get("/get-vendors",  requireAdminAuth, getVendors )

router.put("/vendor-approval/:id",requireAdminAuth, vendorApproval)

router.post("/create-banner" , requireAdminAuth, addBanner)


export { router as adminRouter };
