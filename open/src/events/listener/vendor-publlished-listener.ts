import { Message } from "node-nats-streaming";
import { Subjects, Listener, VendorPublishedEvent  } from "@snackopedia/common";
import { User } from "../../models/user";
import { Vendor } from "../../models/vendor";

export class VendorPublishedListener extends Listener<VendorPublishedEvent> {
  subject: Subjects.VendorPublished = Subjects.VendorPublished;
  queueGroupName = "open-service";

  async onMessage(data: VendorPublishedEvent["data"], msg: Message) {
    console.log("vendor published event recieved in the open service from vendor service", data);
    msg.ack();
    const {  id,
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
        menu } = data;

    let vendorId = id ;
    const existingVendor = await Vendor.findOne({ phone });

    if (existingVendor) {
        const filter = { phone: phone };
        const options = { new: true };

        const updatedData = {
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
        menu
        };
        
        Vendor.findOneAndUpdate(filter, updatedData, options, (err, doc) => {
            if (err) {
                console.log("Error updating document:", err);
            } else {
                console.log("Document updated successfully:", doc);
            }
        });
    } else {
        const vendor = Vendor.build({ name,
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
            menu });

            try {
                await Vendor.save();
            } catch (error) {
                console.log(error)
            }
    }

    
  }
}
