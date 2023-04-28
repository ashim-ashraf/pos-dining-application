import express, { Request, Response } from "express";
import { bookTable, cancelOrder, createOrder, getOrders, getVendorById, getVendors, orderPayment, releiveTable } from "../controller/user-controller";
import { requireTableAuth } from "@snackopedia/common";

const router = express.Router();

router.post('/book-table', bookTable )

router.post('/releive-table', releiveTable)

router.post('/orders', createOrder)

router.post('/cancel-orderitem', cancelOrder)

router.post('/payment', orderPayment)

router.get("/orders/:id", getOrders)

router.get("/get-vendors", getVendors);

router.get("/get-vendor/:id", getVendorById);

export { router as userRouter };