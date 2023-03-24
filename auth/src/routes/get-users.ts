import express, { Router } from "express";
import { User } from "../models/user";

const router = express.Router();

router.get("/api/users/get-all-users", async (req,res) => {
    let users = await User.find();
    console.log(users);
    res.status(200).send(users);
})

export { router as getUsersRouter}