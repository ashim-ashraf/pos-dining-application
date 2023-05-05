import mongoose from "mongoose";

interface MessageAttrs {
    conversationId: string;
    sender: string;
    text: string;
}

interface MessageDoc extends mongoose.Document {
    conversationId: string;
    sender: string;
    text: string;
}

interface MessageModel extends mongoose.Model<MessageDoc> {
  build(attrs: MessageAttrs): MessageDoc;
}

const messageSchema = new mongoose.Schema(
    {
      conversationId: {
        type: String,
      },
      sender: {
        type: String,
      },
      text: {
        type: String,
      },
    },
    { timestamps: true }
  );

  messageSchema.statics.build = (attrs: MessageAttrs) => {
  return new Message(attrs);
};

const Message = mongoose.model<MessageDoc, MessageModel>("Message", messageSchema);

export { Message };
