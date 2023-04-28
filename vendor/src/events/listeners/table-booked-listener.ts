import { Message } from "node-nats-streaming";
import { Subjects, Listener, TableBookedEvent } from "@snackopedia/common";
import { Table } from "../../models/table";

export class TableBookedListener extends Listener<TableBookedEvent> {
  subject: Subjects.TableBooked = Subjects.TableBooked;
  queueGroupName = "vendor-service";

  async onMessage(data: TableBookedEvent["data"], msg: Message) {
    const {id} = data;

    try{
    const table = await Table.findOneAndUpdate(
        { _id: id, status: "open" },
        { $set: { status: "booked" } },
        { new: true }
      );
    } catch (error) {
        console.log(error)
    }

    msg.ack();
  }
}
