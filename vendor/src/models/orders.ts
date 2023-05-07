import mongoose from "mongoose";

interface OrdersAttrs {
  restaurantId:string,
  orders: [{
    _id: String,
    items: [],
    restaurantId: String,
    totalAmount: Number,
    createdAt:string
}],

}

interface OrdersDoc extends mongoose.Document {
  restaurantId:string,
  orders: [{
    _id: String,
    items: [],
    restaurantId: String,
    totalAmount: Number,
    createdAt:string
}],
}

interface OrdersModel extends mongoose.Model<OrdersDoc> {
  build(attrs: OrdersAttrs): OrdersDoc;
}

const ordersSchema = new mongoose.Schema(
  {
    restaurantId: String,
    orders: [{
        _id: String,
        items: Array,
        restaurantId: String,
        totalAmount: Number,
        createdAt: {
          type: Date,
          default: Date.now
        }
    }],
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
      },
    },
  }
);

ordersSchema.statics.build = (attrs: OrdersAttrs) => {
  return new Orders(attrs);
};

const Orders = mongoose.model<OrdersDoc, OrdersModel>("Orders", ordersSchema);

export { Orders };
