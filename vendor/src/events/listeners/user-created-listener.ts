import { Message } from "node-nats-streaming";
import { Subjects, Listener, UserCreatedEvent, BadRequestError } from "@snackopedia/common";
import { User } from "../../models/user";

export class UserCreatedListener extends Listener<UserCreatedEvent> {
  subject: Subjects.UserCreated = Subjects.UserCreated;
  queueGroupName = "user-service";

  async onMessage(data: UserCreatedEvent["data"], msg: Message) {
    console.log("user created event recieved in the vendor service from user service", data);
    const { id, name, email, password, phone, status } = data;

    let userId = id ;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError("Email in use");
    }

    const existingPhone = await User.findOne({ phone });

    if(existingPhone){
      throw new BadRequestError("Phone number in use")
    }

    const user = User.build({ userId, name, email, password, phone });

    try {
        await user.save();
    } catch (error) {
        console.log(error)
    }

    msg.ack();
  }
}
