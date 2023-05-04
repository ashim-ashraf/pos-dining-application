import { Message } from "node-nats-streaming";
import { Subjects, Listener, VendorPublishedEvent } from "@snackopedia/common";
import { Vendor } from "../../models/vendor";

export class VendorPublishedListener extends Listener<VendorPublishedEvent> {
  subject: Subjects.VendorPublished = Subjects.VendorPublished;
  queueGroupName = "open-service";

  async onMessage(data: VendorPublishedEvent["data"], msg: Message) {

    const {
      id,
      name,
      restaurantName,
      description,
      restaurantAddress,  
      email,
      phone,
      liscenceNo,
      vendorStatus,
      image,
      restaurantType,
      restaurantPhone,
      category,
      menu,
    } = data;

    let restaurantId = id;
    const existingVendor = await Vendor.findOne({ phone });

    if (existingVendor) {
      const filter = { phone: phone };
      const options = { new: true };

      const updatedData = {
        restaurantId,
        name,
        restaurantName,
        description,
        restaurantAddress,
        email,
        phone,
        liscenceNo,
        vendorStatus,
        image,
        restaurantType,
        restaurantPhone,
        category,
        menu,
      };

      Vendor.findOneAndUpdate(filter, updatedData, options, (err, doc) => {
        if (err) {
          console.log("Error updating document:", err);
        } else {
          console.log("Document updated successfully")
        }
      });
    } else {
      const vendor = Vendor.build({
        restaurantId,
        name,
        restaurantName,
        description,
        restaurantAddress,
        email,
        phone,
        liscenceNo,
        vendorStatus,
        image,
        restaurantType,
        restaurantPhone,
        category,
        menu,
      });

      try {
        await vendor.save();
        console.log("new vendor published")
      } catch (error) {
        console.log(error);
      }
    }

    msg.ack();
  }
}
