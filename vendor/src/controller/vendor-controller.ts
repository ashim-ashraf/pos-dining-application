import { Request, Response, NextFunction } from "express";
import { Table } from "../models/table";
import { OrderStatusUpdatePublisher } from "../events/publishers/order-status-publisher";
import { natsWrapper } from "../nats-wrapper";
import { Vendor } from "../models/vendor";
import mongoose from "mongoose";
import { BadRequestError } from "@snackopedia/common";
import jwt from "jsonwebtoken";
import { VendorPublisher } from "../events/publishers/vendor-publisher";
import { VendorOpenStatusPublisher } from "../events/publishers/vendor-openstatus-publisher";
import { deleteFile } from "../middleware/upload";
import { Orders } from "../models/orders";

export const getAllTables = async (req: Request, res: Response) => {
  console.log("get table route called ");
  let tables = await Table.find();
  if (!tables) {
    res.status(404).send({ error: "No data found" });
  }
  res.status(200).send(tables);
};

export const getTableById =async (req:Request, res:Response) => {
  let tableId = req.params;
try{
  let table = await Table.findById(tableId);
  if(!table){
    throw new BadRequestError("Table Not Found")
  }

  res.status(200).send(table)
} catch (error) {
  res.status(500).send({message: "could not find the table"})
}

}

export const vendorSignup = async (req: Request, res: Response) => {
  const { userName, user } = req.body;

  let name = userName;
  let phone = user.phoneNumber;

  const vendor = Vendor.build({
    name,
    phone,
  });

  let existingVendor = await Vendor.findOne({ phone });
  if (existingVendor) {
    throw new BadRequestError("Phone number in use");
  }

  var newVendor = await vendor.save();

  // Generate JWT
  if (newVendor) {
    const vendorJwt = jwt.sign(
      {
        id: newVendor.id,
        phone: newVendor.phone,
      },
      process.env.JWT_VENDOR_KEY!
    );

    req.session = {
      jwt: vendorJwt,
    };
  }

  const vendorDetails = {
    vendorStatus: newVendor.vendorStatus,
    name: newVendor.name,
    phone: newVendor.phone,
    id: newVendor._id,
  };

  res.status(201).send(vendorDetails);
};

export const vendorSignin = async (req: Request, res: Response) => {
  const { user } = req.body;

  let phone = user.phoneNumber;
  let existingVendor = await Vendor.findOne({ phone });
  if (!existingVendor) {
    throw new BadRequestError("User not found");
  }

  // Generate JWT
  const vendorJwt = jwt.sign(
    {
      id: existingVendor.id,
      phone: existingVendor.phone,
    },
    process.env.JWT_VENDOR_KEY!
  );

  req.session = {
    Vendorjwt: vendorJwt,
  };

  res.status(201).send(existingVendor);
};

export const vendorRegistration = async (req: Request, res: Response) => {
  const {
    address,
    description,
    email,
    liscenceNo,
    restaurantPhone,
    pincode,
    restaurantName,
    restaurantType,
    state,
    userId,
    workingDays,
    openingTime,
    closingTime,
  } = req.body;

  interface FileObject extends Express.Multer.File {
    location: string;
  }

  const file = req.file as FileObject;
  const image: string = file.location;

  const pincodeNumber = parseInt(pincode);
  const restaurantPhoneNumer = parseInt(restaurantPhone);
  const liscenceNoNumber = parseInt(liscenceNo);

  let updatedDoc = await Vendor.findOneAndUpdate(
    { _id: userId },
    {
      $set: {
        address,
        description,
        email,
        liscenceNo: liscenceNoNumber,
        restaurantPhone: restaurantPhoneNumer,
        pincode: pincodeNumber,
        restaurantName,
        restaurantType,
        state,
        image,
        workingDays,
        openingTime,
        closingTime,
      },
    },
    { new: true }
  );

  if (updatedDoc?.restaurantName) {
    res.status(200).send(updatedDoc);
  } else {
    res.status(400).send({ success: false });
  }
};

export const editVendorRegistration = async (req: Request, res: Response) => {
  const {
    address,
    description,
    email,
    liscenceNo,
    restaurantPhone,
    pincode,
    restaurantName,
    restaurantType,
    state,
    userId,
    image,
  } = req.body;

  interface FileObject extends Express.Multer.File {
    location: string;
  }
  var Img: any;
  const file = req.file as FileObject;
  if (file) {
    Img = file.location;
  } else {
    Img = image;
  }

  const pincodeNumber = parseInt(pincode);
  const restaurantPhoneNumer = parseInt(restaurantPhone);
  const liscenceNoNumber = parseInt(liscenceNo);

  let updatedDoc = await Vendor.findOneAndUpdate(
    { _id: userId },
    {
      $set: {
        address,
        description,
        email,
        liscenceNo: liscenceNoNumber,
        restaurantPhone: restaurantPhoneNumer,
        pincode: pincodeNumber,
        restaurantName,
        restaurantType,
        state,
        image: Img,
      },
    },
    { new: true }
  );

  if (updatedDoc?.restaurantName) {
    res.status(200).send(updatedDoc);
  } else {
    res.status(400).send({ success: false });
  }
};

export const vendorSignout = (req: Request, res: Response) => {
  req.session = null;
  res.send({});
};

export const getVendorById = async (req: Request, res: Response) => {
  const vendorId = req.params.id;

  const vendorDetails = await Vendor.findOne({ _id: vendorId });
  const menu = vendorDetails?.menu;

  if (vendorDetails) {
    res.status(200).send({ vendorDetails, menu });
  } else {
    res.status(400).send({ success: false });
  }
};

export const checkVendorApproval = async (req: Request, res: Response) => {
  const vendorId = req.params.restaurantId;
  console.log("fasdfsadfasdf");
  const vendorDetails = await Vendor.findOne({ _id: vendorId });
  if (!vendorDetails) {
    throw new BadRequestError("Vendor Not found by id");
  }
  const approval = vendorDetails.vendorStatus;
  console.log("aaaaaaaaaaaaaaaaa", approval);

  if (approval) {
    res.status(200).send(approval);
  } else {
    res.status(400).send(approval);
  }
};

export const getAllVendors = async (req: Request, res: Response) => {
  let vendors = await Vendor.find();
  res.status(200).send(vendors);
};

export const listedVendor = async (req: Request, res: Response) => {
  const vendorId = req.params.id;
  const vendorDetails = await Vendor.findOne({ _id: vendorId });
  if (vendorDetails?.restaurantName) {
    res.status(200).send(vendorDetails);
  } else {
    res.status(400);
  }
};

export const checkVendor = async (req: Request, res: Response) => {
  const { phone } = req.body;

  let existingVendor = await Vendor.findOne({ phone });
  if (!existingVendor) {
    res.status(400).send({
      errors: [{ message: "Account not found" }],
    });
  } else {
    res.status(201).send(existingVendor);
  }
};

export const getMenuByVendorId = async (req: Request, res: Response) => {
  const userId = req.params.id;
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
};

export const publishVendor = async (req: Request, res: Response) => {
  console.log("publish vendor route called");
  const vendorId = req.params.id;

  const vendor = await Vendor.findOne({ _id: vendorId });
  if (!vendor) {
    return res.status(400).send({ error: "Vendor not found" });
  }

  try {
    await new VendorPublisher(natsWrapper.client).publish({
      id: vendor._id,
      name: vendor.name,
      restaurantName: vendor.restaurantName,
      description: vendor.description,
      restaurantAddress: vendor.restaurantAddress,
      email: vendor.email,
      phone: vendor.phone,
      liscenceNo: vendor.liscenceNo,
      vendorStatus: vendor.vendorStatus,
      image: vendor.image,
      restaurantType: vendor.restaurantType,
      restaurantPhone: vendor.restaurantPhone,
      category: vendor.category,
      menu: vendor.menu,
    });

    res.status(200).send({ message: "vendor published" });
  } catch (error) {
    throw new BadRequestError("publish failed");
  }
};

export const handleShopOpenStatus = async (req: Request, res: Response) => {
  const { restaurantId } = req.params;
  const { status } = req.body;

  try {
    // Find the vendor by ID and update the vendorStatus property
    const vendor = await Vendor.findByIdAndUpdate(
      restaurantId,
      { $set: { openStatus: status } },
      { new: true }
    );

    await new VendorOpenStatusPublisher(natsWrapper.client).publish({
      restaurantId: restaurantId,
      status: status,
    });

    res.status(200).send({ message: "status changed successfully" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, error });
  }
};

export const manageOrderStatus = async (req: Request, res: Response) => {
  const { tableId, entityId, status } = req.body;

  try {
    const table = await Table.findOneAndUpdate(
      {
        _id: tableId,
        "currentOrder.items.entityId": entityId,
      },
      {
        $set: {
          "currentOrder.items.$[elem].orderStatus": status,
        },
      },
      {
        new: true,
        arrayFilters: [
          {
            "elem.entityId": entityId,
          },
        ],
      }
    );

    await new OrderStatusUpdatePublisher(natsWrapper.client).publish({
      tableId: tableId,
      itemId: entityId,
      status: status,
    });

    return res.status(200).send(table);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getAllOrders = async (req: Request, res: Response) => {
  const restaurantId = req.params.id;

  const orders = await Orders.find();

  console.log();
};

export const createMenuItem = async (req: Request, res: Response) => {
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
  const image: string = file.location;

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
    console.log(error);
  }

  res.status(200).send({ success: true });
};

export const editItem = async (req: Request, res: Response) => {
  const {
    _id,
    itemName,
    retailPrice,
    description,
    sellingPrice,
    category,
    userId,
    image,
  } = req.body;

  interface FileObject extends Express.Multer.File {
    location: string;
  }
  var Img: any;
  const file = req.file as FileObject;
  if (file) {
    Img = file.location;
  } else {
    Img = image;
  }

  const newMenuItem = {
    _id: _id ? mongoose.Types.ObjectId(_id) : new mongoose.Types.ObjectId(),
    itemName: String(itemName),
    retailPrice: Number(retailPrice),
    description: String(description),
    sellingPrice: Number(sellingPrice),
    category: String(category),
    image: Img,
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
    console.log(error);
  }

  res.status(200).send({ success: true });
};

export const addCategory = async (req: Request, res: Response) => {
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
};

export const getCategoryById = async (req: Request, res: Response) => {
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
};

export const deleteCategory = async (req: Request, res: Response) => {
  const { userId, categoryName } = req.params;
  console.log(categoryName);

  // Vendor.updateOne({ _id: userId }, { $pull: { category: categoryName } })
  // .then(() => {
  //   res.status(200).send({ success: true });
  // })
  // .catch((err) => {
  //   console.log(err);
  // });
};

export const deleteS3image = async (req: Request, res: Response) => {
  const { imageUrl } = req.body;

  try {
    deleteFile(imageUrl);
    res.status(200).send({ message: "image deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "could not delete image" });
  }
};
