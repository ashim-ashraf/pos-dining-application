import { Request, Response, NextFunction } from "express";
import { Table } from "../models/table";

export const getAllTables = async ( req: Request, res:Response) => {
    let tables = await Table.find()
    if(!tables){
      res.status(404).send({error:"No data found"})
    }
    res.status(200).send(tables);
  }

export const  manageOrderStatus = async ( req: Request, res:Response) => {
  const {tableId, itemId, status} = req.body;
  console.log(tableId,itemId,status)

  try {
    const table = await Table.findOneAndUpdate(
      { _id: tableId, "currentOrder.items._id": itemId },
      { $set: { "currentOrder.items.$.orderStatus": status } },
      { new: true }
    );
    console.log(table)
    if (!table) {
      return res.status(404).json({ message: 'Table not found' });
    }

    
    
    return res.status(200).send(table)
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
}
