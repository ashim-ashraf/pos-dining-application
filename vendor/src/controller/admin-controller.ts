import { BadRequestError } from "@snackopedia/common";
import { Request, Response, NextFunction } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { Table } from "../models/table";
import { Vendor } from "../models/vendor";


export const AdminVerify = (req:Request, res: Response) => {
  res.send({ currentAdmin: req.currentAdmin || null });
}

export const validateAdminSignin = [
  body("username").notEmpty().withMessage("Name is required"),
  body("password").trim().notEmpty().withMessage("You must supply a password"),
];

export const adminSignin = (req: Request, res: Response) => {
  const { username, password } = req.body;
  console.log ("hhhh",process.env.ADMIN_PASSWORD, process.env.ADMIN_USERNAME, process.env.JWT_ADMIN_KEY )

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

    // Store it on session object
    req.session = {
      Adminjwt: adminJWT,
    };

    res.sendStatus(201)
  } else {
    res.status(400).send({errors: "Inavlid Credentials"})
  }
};

export const addTable = async (req: Request, res: Response) => {
    const {seats} = req.body;  
    const table = Table.build({
      seats: seats,
      currentOrder: {"orders":"empty"},
    })
    
    try {
      await table.save();
      res.status(201).json(table.toJSON());
    } catch (err) {
      console.error(err);
      res.status(500).send('Unable to save the table.');
    }
}

  export const getAllTables = async ( req: Request, res:Response) => {
    let tables = await Table.find()
    if(!tables){
      res.status(404).send({error:"No data found"})
    }
    res.status(200).send(tables);
  }

export const deleteTableById =  async ( req: Request, res:Response) => {
  try {
    const table = await Table.findById(req.params.id);
    if (!table) {
      return res.status(404).json({ error: 'Table not found' });
    }
    await table.remove();
    res.status(200).send({message:"Table deleted"})
  } catch(err) {
    res.status(500).send({ error: 'Delete Failed' });
  } 
}

export const getVendors = async (req: Request, res:Response) => {
  let vendors = await Vendor.find();
  if(!vendors){
    res.status(404).send({error:"Venodrs not found"})
  }
  res.status(200).send(vendors);
}

export const vendorApproval = async (req: Request, res:Response) => {
  const { id } = req.params;
  const { currentStatus } = req.body;
console.log(currentStatus)
  try {
    // Find the vendor by ID and update the vendorStatus property
    const vendor = await Vendor.findByIdAndUpdate(
      id,
      { $set: { vendorStatus: currentStatus } },
      { new: true }
    );

    res.json({ success: true, vendor });
  } catch (error) {
    console.error(error);
    res.json({ success: false, error });
  }
}

export const test = (req: Request, res: Response, next: NextFunction) => {
  console.log("test called with ", req.body);
  next();
};
