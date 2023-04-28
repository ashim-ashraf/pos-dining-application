import {
  BadRequestError,
  Listener,
  OrderItemCancelledEvent,
  Subjects,
} from "@snackopedia/common";
import { Table } from "../../models/table";
import { Message } from "node-nats-streaming";
const mongoose = require("mongoose");

export class OrderItemCancelledListener extends Listener<OrderItemCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
  queueGroupName = "vendor-service";

  async onMessage(data: OrderItemCancelledEvent["data"], msg: Message) {
    const { tableId, itemId, status } = data;
    const entityId = itemId;

    console.log("in kkk", tableId, itemId, status);

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

      msg.ack();
    } catch (error) {
      console.log(error);
    }
  }
}
