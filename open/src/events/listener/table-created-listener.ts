import { Message } from "node-nats-streaming";
import { Subjects, Listener, TableCreatedEvent } from "@snackopedia/common";
import { Table } from "../../models/table";

const mongoose = require('mongoose');

export class TableCreatedListener extends Listener<TableCreatedEvent> {
  subject: Subjects.TableCreated = Subjects.TableCreated;
  queueGroupName = "open-service";

  async onMessage(data: TableCreatedEvent["data"], msg: Message) {
    
    const {
      id,
      seats,
      status,
      currentOrder,
      PreviousOrders,
    } = data;

    const table = Table.build({
        id:mongoose.Types.ObjectId(id),
        seats: seats,
        status: status,
        currentOrder: currentOrder,
        PreviousOrders: PreviousOrders,
      });


      try {
        const savedTable = await table.save();
      } catch (err) {
        console.error(err);
      }


    msg.ack();
  }
}
