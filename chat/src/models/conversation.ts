import mongoose from "mongoose";

interface ConversationAttrs {
    members:[]
}

interface ConversationDoc extends mongoose.Document {
    members:[]
}

interface conversationModel extends mongoose.Model<ConversationDoc> {
  build(attrs: ConversationAttrs): ConversationDoc;
}

const conversationSchema = new mongoose.Schema(
    {
      members: {
        type: Array,
      },
    },
    { timestamps: true }
  );

  conversationSchema.statics.build = (attrs: ConversationAttrs) => {
  return new Conversation(attrs);
};

const Conversation = mongoose.model<ConversationDoc, conversationModel>("Conversation", conversationSchema);

export { Conversation };
