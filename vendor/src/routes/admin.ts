import express, { Request, Response } from "express";
import { body } from "express-validator";
import { Password } from "../services/password";
import {
  AdminVerify,
  addBanner,
  addTable,
  adminSignin,
  cardStats,
  deleteBanner,
  deleteTableById,
  getAllTables,
  getBanners,
  getVendors,
  lineChartStats,
  validateAdminSignin,
  vendorApproval,
} from "../controller/admin-controller";
import { requireAdminAuth, validateRequest } from "@snackopedia/common";

const upload = require("../middleware/upload");
const router = express.Router();

router.get("/admin-verify", requireAdminAuth, AdminVerify);

router.post("/signin", validateAdminSignin, validateRequest, adminSignin);

router.post("/add-table", requireAdminAuth, addTable);

router.get("/get-tables", requireAdminAuth, getAllTables);

router.delete("/delete-table/:id", requireAdminAuth, deleteTableById);

router.get("/get-vendors", requireAdminAuth, getVendors);

router.put("/vendor-approval/:id", requireAdminAuth, vendorApproval);

router.get("/card-stats", requireAdminAuth, cardStats);

router.get("/linechart-stats", lineChartStats);

router.get("/get-banners", requireAdminAuth, getBanners);

router.delete("/delete-banner/:bannerId", requireAdminAuth, deleteBanner);

router.post(
  "/create-banner",
  requireAdminAuth,
  upload.single("image"),
  addBanner
);

export { router as adminRouter };
