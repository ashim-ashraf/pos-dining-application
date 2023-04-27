import express, { Request, Response } from "express";
import { bookTable, cancelOrder, getOrders, getVendorById, getVendors, handleOrder, releiveTable } from "../controller/user-controller";
import { requireTableAuth } from "@snackopedia/common";

const router = express.Router();

router.post('/book-table', bookTable )

router.post('/releive-table', releiveTable)

router.post('/orders', handleOrder)

router.post('/cancel-orderitem', cancelOrder)

router.get("/orders/:id", getOrders)

router.get("/get-vendors", getVendors);

router.get("/get-vendor/:id", getVendorById);

export { router as userRouter };