import { BadRequestError, requireVendorAuth } from "@snackopedia/common";
import express from "express";
import { Vendor } from "../models/vendor";
import mongoose from "mongoose";

const upload = require("../middleware/upload");
const router = express.Router();

router.post("/api/vendors/category", async (req, res) => {
  let { userId, categoryName } = req.body;
  console.log(userId, categoryName);

  const existingCategory = await Vendor.findOne({
    _id: userId,
    category: { $regex: new RegExp(`^${categoryName}$`, "i") },
  });
  if (existingCategory) {
    return res.status(400).send({ error: "Category already exists" });
  }

  try {
    Vendor.updateOne({ _id: userId }, { $push: { category: categoryName } })
      .then(() => {
        res.status(200).send({ success: true });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    console.log(error);
  }
});

router.get("/api/vendors/category/:id", async (req, res) => {
  const userId = req.params.id;
  console.log("get called", userId);

  try {
    const vendor = await Vendor.findOne({ _id: userId });
    if (!vendor) {
      return res.status(400).send({ error: "Vendor not found" });
    }
    const categories = vendor.category;
    res.status(200).send({ categories });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "category not found" });
  }
});

router.delete(
  "/api/vendors/categories/:userId/:categoryName",
  async (req, res) => {
    const { userId, categoryName } = req.params;
    console.log(categoryName);

    // Vendor.updateOne({ _id: userId }, { $pull: { category: categoryName } })
    // .then(() => {
    //   res.status(200).send({ success: true });
    // })
    // .catch((err) => {
    //   console.log(err);
    // });
  }
);

router.post(
  "/api/vendors/create-menuItem",
  upload.single("image"),
  async (req, res) => {
    const {
      _id,
      itemName,
      retailPrice,
      description,
      sellingPrice,
      category,
      userId,
    } = req.body;
    
    interface FileObject extends Express.Multer.File {
      location: string;
    }
    
      const file = req.file as FileObject;
      const image : string = file.location;
    
    const newMenuItem = {
      _id: _id ? mongoose.Types.ObjectId(_id) : new mongoose.Types.ObjectId(),
      itemName: String(itemName),
      retailPrice: Number(retailPrice),
      description: String(description),
      sellingPrice: Number(sellingPrice),
      category: String(category),
      image,
    };

    try {
      let vendor;
      if (_id) {
        vendor = await Vendor.findOneAndUpdate(
          { _id: userId, "menu._id": newMenuItem._id },
          { $set: { "menu.$": newMenuItem } },
          { new: true }
        );
      } else {
        vendor = await Vendor.findOneAndUpdate(
          { _id: userId },
          { $push: { menu: newMenuItem } },
          { new: true }
        );
      }
    } catch (error) {
      console.log(error)
    }

    res.status(200).send({ success: true });
  }
);

router.get("/api/vendors/menu/:id", async (req, res) => {
  const userId = req.params.id;
  console.log("get called", userId);

  try {
    const vendor = await Vendor.findOne({ _id: userId });
    if (!vendor) {
      return res.status(400).send({ error: "Vendor not found" });
    }

    const menu = vendor.menu;
    res.status(200).send({ menu });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "menu not found" });
  }
});

export { router as MenuRouter };
