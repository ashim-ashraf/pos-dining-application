import {
    Listener,
    OrderPaymentUpdateEvent,
    Subjects,
  } from "@snackopedia/common";
  import { Table } from "../../models/table";
  import { Message } from "node-nats-streaming";
  const mongoose = require("mongoose");
  
  export class OrderPaymentUpdateListener extends Listener<OrderPaymentUpdateEvent> {
    subject: Subjects.PaymentUpdate = Subjects.PaymentUpdate;
    queueGroupName = "vendor-service";
  
    async onMessage(data: OrderPaymentUpdateEvent["data"], msg: Message) {
      const { order, tableId  } = data;
    
  
      
      try {
        const table = await Table.findOneAndUpdate(
            { _id: tableId },
            {
              $push: { previousOrders: order },
              $set: { status: "open" },
              $unset: { currentOrder: {} },
            },
            { new: true }
          );
  
        msg.ack();
      } catch (error) {
        console.log(error);
      }
    }
  }
  