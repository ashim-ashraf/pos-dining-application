import express from "express";
import { currentUser } from "@snackopedia/common";
import { requireAuth } from "@snackopedia/common";

const router = express.Router();

router.get("/api/users/currentuser", currentUser, requireAuth, (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };

