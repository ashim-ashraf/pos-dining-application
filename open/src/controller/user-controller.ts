import express, { Request, Response } from "express";
import { Table } from "../models/table";
import jwt from "jsonwebtoken";
import { natsWrapper } from "../nats-wrapper";
import { TableBookedPublisher } from "../events/publisher/table-booked-publisher";
import mongoose from "mongoose";
import { OrderCreatedPublisher } from "../events/publisher/order-created-publisher";

export const bookTable = async (req: Request, res: Response) => {
  //here code is sent from frontEnd by decoding QR the code is actually a tableid
  const { code } = req.body;
  try {
    const table = await Table.findOneAndUpdate(
      { id: code, status: "open" },
      { $set: { status: "booked" } },
      { new: true }
    );

    if (!table) {
      return res.status(404).send({ error: "Table not available for booking" });
    }

    await new TableBookedPublisher(natsWrapper.client).publish({
      id: code,
      status: "booked",
    });

    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: code,
      },
      process.env.JWT_KEY!
    );

    // Store it on session object
    req.session = {
      jwt: userJwt,
    };
    
    let tableid = table.id
    return res
      .status(200)
      .send({ message: "Table booked successfully", tableid });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Internal server error" });
  }
};

export const handleOrder = async (req: Request, res: Response) => {
  const cart  = JSON.parse(req.body.cart);
  const tableId = req.body.table;

  const items = Object.values(cart.items).map(item => {
    const { ...rest } = item as { _id: string, [key: string]: unknown };
    return { ...rest, orderStatus: "preparing" }; 
});

  try {
    const table = await Table.findOne({ id: tableId });
    if (!table) {
      return res.status(404).json({ message: "Table not found" });
    }

    // Add the cart items as a new order in the currentOrder field of the table document
    const orderId = new mongoose.Types.ObjectId();
    const restaurantId = cart.restaurantId;
    const order = { _id: orderId, restaurantId, items };
    table.currentOrder = order;
    await table.save();

    await new OrderCreatedPublisher(natsWrapper.client).publish({
      order:order,
      tableId:tableId,  
    })

    res.status(200).json({ message: "Order placed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getOrders = async (req: Request, res: Response) => {
  const tableId = req.params.id;

  try {
    const table = await Table.findOne({ id: tableId });
    if (!table) {
      return res.status(404).json({ message: "Table not found" });
    }
    const orders = table.currentOrder
    console.log(orders)
    res.status(200).send(orders)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}



