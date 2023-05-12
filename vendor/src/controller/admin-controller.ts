import { BadRequestError } from "@snackopedia/common";
import { Request, Response, NextFunction } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { Table } from "../models/table";
import { Vendor } from "../models/vendor";
import { TableCreatedPublisher } from "../events/publishers/table-created-publisher";
import { natsWrapper } from "../nats-wrapper";
import { VendorApprovalPublisher } from "../events/publishers/vendor-approval-publisher";
import { Banner } from "../models/banner";
import {
  getAllVendorMonthlyDataForYear,
  getMonthlyVisitorsCount,
  getTopSeller,
  getVisitorsCount,
} from "../helpers/admin-helper";

export const AdminVerify = (req: Request, res: Response) => {
  res.send({ currentAdmin: req.currentAdmin || null });
};

export const validateAdminSignin = [
  body("username").notEmpty().withMessage("Name is required"),
  body("password").trim().notEmpty().withMessage("You must supply a password"),
];

export const adminSignin = (req: Request, res: Response) => {
  const { username, password } = req.body;
  console.log(
    "hhhh",
    process.env.ADMIN_PASSWORD,
    process.env.ADMIN_USERNAME,
    process.env.JWT_ADMIN_KEY
  );

  if (
    password === process.env.ADMIN_PASSWORD &&
    username === process.env.ADMIN_USERNAME
  ) {
    // Generate JWT
    const adminJWT = jwt.sign(
      {
        username: username,
      },
      process.env.JWT_ADMIN_KEY!
    );

    req.session = {
      Adminjwt: adminJWT,
    };

    res.sendStatus(201);
  } else {
    res.status(400).send({ errors: "Inavlid Credentials" });
  }
};

export const addTable = async (req: Request, res: Response) => {
  const { seats } = req.body;
  const table = Table.build({
    seats: seats,
    currentOrder: { orders: "empty" },
  });

  try {
    const savedTable = await table.save();
    res.status(201).send({ success: true, data: savedTable });

    await new TableCreatedPublisher(natsWrapper.client).publish({
      id: savedTable._id,
      seats: savedTable.seats,
      status: savedTable.status,
      currentOrder: savedTable.currentOrder,
      PreviousOrders: savedTable.previousOrders,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Unable to save the table.");
  }
};

export const getAllTables = async (req: Request, res: Response) => {
  let tables = await Table.find();
  if (!tables) {
    res.status(404).send({ error: "No data found" });
  }
  res.status(200).send(tables);
};

export const deleteTableById = async (req: Request, res: Response) => {
  try {
    const table = await Table.findById(req.params.id);
    if (!table) {
      return res.status(404).json({ error: "Table not found" });
    }
    await table.remove();
    res.status(200).send({ message: "Table deleted" });
  } catch (err) {
    res.status(500).send({ error: "Delete Failed" });
  }
};

export const getVendors = async (req: Request, res: Response) => {
  let vendors = await Vendor.find();
  if (!vendors) {
    res.status(404).send({ error: "Venodrs not found" });
  }
  res.status(200).send(vendors);
};

export const vendorApproval = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { currentStatus } = req.body;

  try {
    // Find the vendor by ID and update the vendorStatus property
    const vendor = await Vendor.findByIdAndUpdate(
      id,
      { $set: { vendorStatus: currentStatus } },
      { new: true }
    );

    await new VendorApprovalPublisher(natsWrapper.client).publish({
      id: id,
      currentStatus: currentStatus,
    });

    res.json({ success: true, vendor });
  } catch (error) {
    console.error(error);
    res.json({ success: false, error });
  }
};

export const test = (req: Request, res: Response, next: NextFunction) => {
  console.log("test called with ", req.body);
  next();
};

export const addBanner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, url } = req.body;
  interface FileObject extends Express.Multer.File {
    location: string;
  }
  const file = req.file as FileObject;
  const image: string = file.location;
  try {
    const newBanner = new Banner({
      title,
      url,
      image,
    });
    await newBanner.save();
    res.status(201).send({ success: true });
  } catch (err) {
    next(err);
  }
};

export const getBanners = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let banners = await Banner.find();
  res.status(200).send(banners);
};

export const cardStats = async (req: Request, res: Response) => {
  console.log("called");

  try {
    const [topSeller, dailyCount, monthlyCount] = await Promise.all([
      getTopSeller(),
      getVisitorsCount(),
      getMonthlyVisitorsCount(),
    ]);
    
    // Send response with data
    res.status(200).send({
      topSeller,
      dailyCount,
      monthlyCount,
    });

  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

export const lineChartStats = async (req: Request, res: Response) => {
  try {
    let yearlyVendorSales = await getAllVendorMonthlyDataForYear();
  console.log(yearlyVendorSales);
  res.status(200).send(yearlyVendorSales)
  } catch (error) {
    throw new BadRequestError("Sale data could not be computed")
  }
}

export const deleteBanner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bannerId = req.params.bannerId;
  try {
    const deleteBanner = await Banner.deleteOne({ _id: bannerId });
    res.status(200).send({ message: "Banner Succesffully Deleted" });
  } catch (error) {
    res.status(500).send({ message: "Banner Deletion Failed" });
  }
};
