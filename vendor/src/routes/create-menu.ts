import { BadRequestError, requireVendorAuth } from "@snackopedia/common";
import express from "express";
import { TableBookedPublisher } from "../events/publishers/table-booked-publisher";
import { natsWrapper } from "../nats-wrapper";
import { Vendor } from "../models/vendor";
import { UpdateQuery } from 'mongoose';
import { VendorDoc } from "../models/vendor"; 

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
  upload.array("image"),
  async (req, res) => {

    const {
      itemName,
      retailPrice,
      description,
      sellingPrice,
      category,
      userId,
    } = req.body;

    interface FileObject {
      location: string;
    }

    const files = req.files;
    let image: { location: string }[] = [];
    if (Array.isArray(files)) {
      image = files.map((file) => ({ location: (file as any).location }));
    } else if (files && typeof files === "object") {
      const keys = Object.keys(files);
      image = keys.flatMap((key) =>
        files[key].map((file) => ({ location: (file as any).location }))
      );
    }

    console.log(typeof retailPrice, typeof sellingPrice, typeof category,  image,typeof itemName)



    const newMenuItem  = {
      itemName: String(itemName),
  retailPrice: Number(retailPrice),
  description: String(description),
  sellingPrice: Number(sellingPrice),
  category: String(category),
      image,
    };

    try {
       await Vendor.updateOne(
        { _id: userId },
        { $push: { menu: newMenuItem } } as UpdateQuery<VendorDoc>
      );
    } catch (error) {
      throw new BadRequestError ("Menu item could not be added")
    }

    res.status(200)
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
