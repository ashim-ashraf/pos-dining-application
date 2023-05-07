import {
    Listener,
    OrderPaymentUpdateEvent,
    Subjects,
  } from "@snackopedia/common";
  import { Table } from "../../models/table";
  import { Message } from "node-nats-streaming";
import { Orders } from "../../models/orders";
  const mongoose = require("mongoose");
  
  export class OrderPaymentUpdateListener extends Listener<OrderPaymentUpdateEvent> {
    subject: Subjects.PaymentUpdate = Subjects.PaymentUpdate;
    queueGroupName = "vendor-service";
  
    async onMessage(data: OrderPaymentUpdateEvent["data"], msg: Message) {
      const { order, tableId, restaurantId } = data;

      try {
        const table = await Table.findOneAndUpdate(
            { _id: tableId },
            {
              $set: { status: "open" },
              $unset: { currentOrder: {} },
            },
            { new: true }
          );
          
          Orders.findOneAndUpdate(
            { restaurantId: restaurantId },
            { $push: { orders: order } },
            { new: true, upsert: true }
          )
          .then(updatedDoc => {
            console.log(updatedDoc);
          })
          .catch(error => {
            console.error(error);
          });
  
        msg.ack();
      } catch (error) {
        console.log(error);
      }
    }
  }
  