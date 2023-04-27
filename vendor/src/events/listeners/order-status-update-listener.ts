import { BadRequestError, Listener, OrderStatusUpdateEvent, Subjects } from "@snackopedia/common";
import { Table } from "../../models/table";
import { Message } from "node-nats-streaming";
const mongoose = require('mongoose');

export class OrderStatusUpdateListener extends Listener<OrderStatusUpdateEvent> {
    subject: Subjects.OrderUpdated = Subjects.OrderUpdated;
    queueGroupName = "vendor-service";
  
    async onMessage(data: OrderStatusUpdateEvent["data"], msg: Message) {
      
        const { tableId, itemId, status } = data;
        const entityId = itemId

        console.log("in kkk",tableId, itemId, status)


      try{
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
        
          console.log("test",table);
          
          
          
      msg.ack();
    } catch (error) {
        console.log(error)
    }
  }
}