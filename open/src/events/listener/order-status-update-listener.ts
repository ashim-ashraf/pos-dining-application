import {
  BadRequestError,
  Listener,
  OrderStatusUpdateEvent,
  Subjects,
} from "@snackopedia/common";
import { Table } from "../../models/table";
import { Message } from "node-nats-streaming";

export class OrderStatusUpdateListener extends Listener<OrderStatusUpdateEvent> {
  subject: Subjects.OrderUpdated = Subjects.OrderUpdated;
  queueGroupName = "open-service";

  async onMessage(data: OrderStatusUpdateEvent["data"], msg: Message) {
    const { tableId, itemId, status } = data;
    const entityId = itemId;

    console.log("final listener",  tableId, itemId, status);
    

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
        throw new BadRequestError("could not update status");
      }

      msg.ack();
    } catch (error) {
      console.log(error);
    }
  }
}
