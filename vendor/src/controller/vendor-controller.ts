import { Request, Response, NextFunction } from "express";
import { Table } from "../models/table";

export const getAllTables = async ( req: Request, res:Response) => {
    let tables = await Table.find()
    if(!tables){
      res.status(404).send({error:"No data found"})
    }
    res.status(200).send(tables);
  }
