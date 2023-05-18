import { BannerCreatedEvent, Listener, Subjects } from "@snackopedia/common";
import { Message } from "node-nats-streaming";
import { Banner } from "../../models/banner";

export class BannerCreatedListener extends Listener<BannerCreatedEvent> {
  subject: Subjects.BannerCreated = Subjects.BannerCreated;
  queueGroupName = "open-service";

  async onMessage(data: BannerCreatedEvent["data"], msg: Message) {
    const { banner } = data;

    const newBanner = new Banner(banner);

    try {
      const savedBanner = await newBanner.save();
      msg.ack();
    } catch (error) {
      console.error("Error saving banner:", error);
    }
  }
}
