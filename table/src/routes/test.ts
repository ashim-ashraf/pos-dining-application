import express from "express";
import { currentUser } from "@snackopedia/common";
import { requireAuth } from "@snackopedia/common";

const router = express.Router();

router.get("/api/tables/currentuser",(req, res) => {
   console.log("test route");
});

export { router as currentUserRouter };