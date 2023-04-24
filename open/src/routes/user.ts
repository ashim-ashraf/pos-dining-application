import express, { Request, Response } from "express";
import { bookTable, getOrders, handleOrder } from "../controller/user-controller";
import { requireTableAuth } from "@snackopedia/common";

const router = express.Router();

router.post('/book-table', bookTable )

router.post('/orders',requireTableAuth, handleOrder)

router.get("/orders/:id", getOrders)

export { router as userRouter };