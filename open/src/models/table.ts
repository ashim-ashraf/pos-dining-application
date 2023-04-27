import mongoose from 'mongoose';

interface TableAttrs {
    id:string;
  seats: string;
  status?: string;
  currentOrder?: {
    _id:  mongoose.Types.ObjectId;
    restaurantId: string;
    items: {
      _id: string;
      entityId: string; 
      itemName: string;
      retailPrice: number;
      description: string;
      sellingPrice: number;
      category: string;
      image: string;
      count: number;
      orderStatus: string;
    }[];
  }
  PreviousOrders?: object;
}

interface TableDoc extends mongoose.Document {
    id:string;
  _id:string;
  seats: string;
  status: string;
  currentOrder?: {
    _id:  mongoose.Types.ObjectId;
    restaurantId: string;
    items: {
      _id: string;
      entityId: string; 
      itemName: string;
      retailPrice: number;
      description: string;
      sellingPrice: number;
      category: string;
      image: string;
      count: number;
      orderStatus: string;
    }[];
  };
  PreviousOrders: object;
}

interface TableModel extends mongoose.Model<TableDoc> {
  build(attrs: TableAttrs): TableDoc;
}

const tableSchema = new mongoose.Schema(
  {
    id: String,
    seats: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default:"open"
    },
    currentOrder: {
      _id:  mongoose.Types.ObjectId,
      restaurantId:  String ,
      items: [
        {
          _id:  String,
          entityId: String, 
          itemName:  String, 
          retailPrice:  Number, 
          description:  String, 
          sellingPrice:  Number, 
          category:  String, 
          image:  String, 
          count:  Number, 
          orderStatus:  String, 
        },
      ],
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
