import mongoose from 'mongoose';

interface OrdersAttrs {
  orders: []
}

interface OrdersDoc extends mongoose.Document {
  orders:[]
}

interface OrdersModel extends mongoose.Model<OrdersDoc> {
  build(attrs: OrdersAttrs): OrdersDoc;
}

const ordersSchema = new mongoose.Schema(
  {
    orders:{
      type:Array,
      default:[]
    }
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

const Orders = mongoose.model<OrdersDoc, OrdersModel>('Orders', ordersSchema);

export { Orders };
