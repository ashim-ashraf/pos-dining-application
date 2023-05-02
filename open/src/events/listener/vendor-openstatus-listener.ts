import {
  BadRequestError,
  Listener,
  Subjects,
  VendorOpenStatusEvent,
} from "@snackopedia/common";
import { Table } from "../../models/table";
import { Message } from "node-nats-streaming";
import { Vendor } from "../../models/vendor";

export class VendorOpenStatusListener extends Listener<VendorOpenStatusEvent> {
  subject: Subjects.VendorOpenStatus = Subjects.VendorOpenStatus;
  queueGroupName = "open-service";

  async onMessage(data: VendorOpenStatusEvent["data"], msg: Message) {
    const { restaurantId, status } = data;
    
    const currentStatus = Boolean(status);

    Vendor.findOneAndUpdate(
      { restaurantId:restaurantId },
      { openStatus: currentStatus },
      { new: true },
      (err) => {
        if (err) throw err;
      }
    );

    msg.ack();
  }
}
