import { BadRequestError, Listener, OrderStatusUpdateEvent, Subjects } from "@snackopedia/common";
import { Table } from "../../models/table";
import { Message } from "node-nats-streaming";

export class OrderStatusUpdateListener extends Listener<OrderStatusUpdateEvent> {
    subject: Subjects.OrderUpdated = Subjects.OrderUpdated;
    queueGroupName = "vendor-service";
  
    async onMessage(data: OrderStatusUpdateEvent["data"], msg: Message) {
      
        const { tableId, itemId, status } = data;
      
        try {
          const table = await Table.findOneAndUpdate(
            {
              _id: tableId,
              "currentOrder.items": {
                $elemMatch: {
                  _id: itemId
                }
              }
            },
            {
              $set: {
                "currentOrder.items.$[elem].orderStatus": status
              }
            },
            {
              new: true,
              arrayFilters: [
                {
                  "elem._id": itemId
                }
              ]
            }
          );
          console.log(table);
          if (!table) {
            throw new BadRequestError("could not update status")
          }
      
      msg.ack();
    } catch (error) {
        console.log(error)
    }
  }
}