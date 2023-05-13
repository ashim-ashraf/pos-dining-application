import express, { Request, Response } from "express";
import { Table } from "../models/table";
import jwt from "jsonwebtoken";
import { natsWrapper } from "../nats-wrapper";
import { TableBookedPublisher } from "../events/publisher/table-booked-publisher";
import mongoose from "mongoose";
import { OrderCreatedPublisher } from "../events/publisher/order-created-publisher";
import { Vendor } from "../models/vendor";
import { v4 as uuidv4 } from "uuid";
import { OrderItemCancelledPublisher } from "../events/publisher/order-cancelled-publisher";
import { OrderPaymentUpdatePublisher } from "../events/publisher/order-payment-publisher";
import { BadRequestError } from "@snackopedia/common";

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

    let tableid = table.id;
    return res
      .status(200)
      .send({ message: "Table booked successfully", tableid });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Internal server error" });
  }
};

export const releiveTable = async (req: Request, res: Response) => {
  const { code } = req.body;
  console.log(code);
  try {
    const table = await Table.findOneAndUpdate(
      { id: code, status: "booked" },
      { $set: { status: "open" } },
      { new: true }
    );

    if (!table) {
      return res.status(404).send({ error: "Couldn't change the table" });
    }

    await new TableBookedPublisher(natsWrapper.client).publish({
      id: code,
      status: "open",
    });

    return res
      .status(200)
      .send({ message: "Table selection removed successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Internal server error" });
  }
};

export const createOrder = async (req: Request, res: Response) => {
  const cart = JSON.parse(req.body.cart);
  const tableId = req.body.table;

  const items = Object.values(cart.items).map((item) => {
    const {
      _id,
      itemName,
      retailPrice,
      description,
      sellingPrice,
      category,
      image,
      count,
      ...rest
    } = item as {
      _id: string;
      itemName: string;
      retailPrice: number;
      description: string;
      sellingPrice: number;
      category: string;
      image: string;
      count: number;
      [key: string]: unknown;
    };
    return {
      _id,
      entityId: uuidv4(),
      itemName,
      retailPrice,
      description,
      sellingPrice,
      category,
      image,
      count,
      orderStatus: "Pending",
      ...rest,
    };
  });

  try {
    const table = await Table.findOne({ id: tableId });
    if (!table) {
      return res.status(404).json({ message: "Table not found" });
    }

    if (table.currentOrder?.items) {
      // If there is already a currentOrder, add the items to the existing items array
      const orderId = new mongoose.Types.ObjectId();
      const restaurantId = cart.restaurantId;
      const newItems = [...table.currentOrder.items, ...items];
      const order = { _id: orderId, restaurantId, items: newItems };

      await Table.updateOne(
        { id: tableId },
        {
          $set: {
            "currentOrder._id": orderId,
            "currentOrder.restaurantId": restaurantId,
            "currentOrder.items": newItems,
          },
        } // include orderId and restaurantId in $set operator
      );

      await new OrderCreatedPublisher(natsWrapper.client).publish({
        order: order,
        tableId: tableId,
      });
    }

    res.status(200).json({ message: "Order placed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const cancelOrder = async (req: Request, res: Response) => {
  const { entityId, tableId, status } = req.body;

  try {
    const table = await Table.findOneAndUpdate(
      {
        id: tableId,
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

    if (!table) {
      return res.status(404).json({ message: "Table not found" });
    }

    await new OrderItemCancelledPublisher(natsWrapper.client).publish({
      tableId: tableId,
      //itemId is now substituted with entityId while communicating
      itemId: entityId,
      status: status,
    });

    return res.status(200).send(table);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const orderPayment = async (req: Request, res: Response) => {
  const { order, tableId, amountPayable } = req.body;
  order.totalAmount = amountPayable;
  console.log(order);
  const restaurantId = order.restaurantId;

  try {
    const table = await Table.findOneAndUpdate(
      { id: tableId },
      {
        $set: { status: "open" },
        $unset: { currentOrder: {} },
      },
      { new: true }
    );

    await new OrderPaymentUpdatePublisher(natsWrapper.client).publish({
      order: order,
      tableId: tableId,
      restaurantId:restaurantId,
    });

    res.status(200).send(table);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

export const getOrders = async (req: Request, res: Response) => {
  const tableId = req.params.id;
  try {
    const table = await Table.findOne({ id: tableId });
    if (!table) {
      return res.status(404).json({ message: "Table not found" });
    }
    const orders = table.currentOrder;
    res.status(200).send(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getVendors = async (req: Request, res: Response) => {
  let vendors = await Vendor.find({
    $and: [{ vendorStatus: true }, { openStatus: true }],
  });
  res.status(200).send(vendors);
};

export const getVendorById = async (req: Request, res: Response) => {
  console.log("get details called");
  const vendorId = req.params.id;

  const vendorDetails = await Vendor.findOne({ restaurantId: vendorId });
  const menu = vendorDetails?.menu;

  const updatedMenu = menu?.map((item:any) => {
    if (!item.ratings || item.ratings.length === 0) {
      return item;
    }
    const totalRatings = item.ratings.reduce((acc:number, rating:number) => acc + rating, 0);
    const averageRating = Number((totalRatings / item.ratings.length).toFixed(1)) ;
    return { ...item, averagerating: averageRating };
  });


  if (vendorDetails) {
    res.status(200).send({ vendorDetails, menu:updatedMenu });
  } else {
    res.status(400).send({ success: false });
  }
};

export const addUserRating = async (req: Request, res: Response) => {
  const { restaurantId, formdata, ratings } = req.body;

  const review = {
    username: formdata.username,
    feedback: formdata.feedback,
  };

  try {
    const vendor = await Vendor.updateOne(
      { restaurantId: restaurantId },
      { $push: { reviews: review } }
    );

 interface Rating {
    id: string;
    rating: number;
  }

    ratings.forEach(async(elem:Rating) => {
      await Vendor.updateOne(
        { restaurantId: restaurantId ,  "menu._id": elem.id },
        { $push: { "menu.$.ratings": elem.rating } }
      );
    });

    res.status(200).send({ message: "User Review submitted" });
  } catch (error) {
    console.log(error);
    throw new BadRequestError("Could not update the review");
  }

};
