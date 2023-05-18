import { BannerDeletedEvent, Listener, Subjects } from "@snackopedia/common";
import { Message } from "node-nats-streaming";
import { Banner } from "../../models/banner";

export class BannerDeletedListener extends Listener<BannerDeletedEvent> {
  subject: Subjects.BannerDeleted = Subjects.BannerDeleted;
  queueGroupName = "open-service";

  async onMessage(data: BannerDeletedEvent["data"], msg: Message) {
    const { bannerId } = data;

    try {
      const deletedBanner = await Banner.findOneAndDelete({ _id: bannerId });
      msg.ack();
    } catch (error) {
      console.error("Error Deleting banner:", error);
    }
  }
}
