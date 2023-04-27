import mongoose from 'mongoose';

interface TableAttrs {
  seats: string;
  status?: string;
  currentOrder?: object;
  PreviousOrders?: object;
}

interface TableDoc extends mongoose.Document {
  _id:string;
  seats: string;
  status: string;
  currentOrder: object;
  PreviousOrders: object;
}

interface TableModel extends mongoose.Model<TableDoc> {
  build(attrs: TableAttrs): TableDoc;
}

const tableSchema = new mongoose.Schema(
  {
    seats: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default:"open"
    },
    currentOrder: {
      type: Object,
      default: {}
    },
    PreviousOrders: {
      type: Object,
      default: {}
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret.__v;
      },
    },
  }
);

tableSchema.statics.build = (attrs: TableAttrs) => {
  return new Table(attrs);
};

const Table = mongoose.model<TableDoc, TableModel>('Table', tableSchema);

export { Table };
