import express from "express";
import { requireAuth } from "@snackopedia/common";

const router = express.Router();

router.get("/api/tables/currentuser",requireAuth,(req, res) => {
   console.log("test route");
   res.sendStatus(200)
});

export { router as currentUserRouter };