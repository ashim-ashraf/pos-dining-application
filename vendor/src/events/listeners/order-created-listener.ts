import { Message } from "node-nats-streaming";
import { Subjects, Listener, OrderCreatedEvent, BadRequestError } from "@snackopedia/common";
import { Table } from "../../models/table";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = "vendor-service";

  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    const { order , tableId } = data;

    const table = await Table.findOne({ _id: tableId });
    if (!table) {
      throw new BadRequestError("Table not found");
    }

    table.currentOrder = order;
    await table.save();
    
    msg.ack();
  }
}
