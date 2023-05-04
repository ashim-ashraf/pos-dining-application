import express, { Request, Response } from "express";

const router = express.Router();

router.get("/messages", (req:Request , res: Response) => {
    res.status(200).send("Hi messages")
})

export { router as chatRouter };