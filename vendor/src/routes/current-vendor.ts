import express from "express";
import { currentUser, requireAuth } from "@snackopedia/common"; 


const router = express.Router();

router.get("/api/vendors/currentvendor", currentUser, requireAuth, (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentVendorRouter };

