import { BadRequestError, Listener, Subjects, VendorApprovalEvent } from "@snackopedia/common";
import { Table } from "../../models/table";
import { Message } from "node-nats-streaming";
import { Vendor } from "../../models/vendor";

export class VendorApprovalListener extends Listener<VendorApprovalEvent> {
    subject: Subjects.VendorApproval = Subjects.VendorApproval;
    queueGroupName = "open-service";
  
    async onMessage(data: VendorApprovalEvent["data"], msg: Message) {
      
        const { id,currentStatus } = data;
      console.log(id, currentStatus)
      const status = Boolean(currentStatus)

        Vendor.findOneAndUpdate(
            { restaurantId: id },
            { vendorStatus: status },
            { new: true },
            (err) => {
              if (err) throw err;
            }
          );
      
      msg.ack();
    
  }
}