import { Message } from "node-nats-streaming";
import { Subjects, Listener, TableBookedEvent } from "@snackopedia/common";



export class TableBookedListener extends Listener <TableBookedEvent> {
    subject: Subjects.TableBooked = Subjects.TableBooked;
    queueGroupName = "table-service";

  async onMessage(data: TableBookedEvent["data"], msg: Message) {
    
    console.log("event recieved in the table service" , data )
    const { tableid, tableNo, userId } = data;

    msg.ack()
  }
}
