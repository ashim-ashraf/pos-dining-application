import mongoose from "mongoose";
import { Password } from "../services/password";

// An interface that describes the properties
// that are requried to create a new User
interface VendorAttrs {
  name?: string;
  restaurantName?: string;
  description?: string;
  restaurantAddress?: object;
  email?: string;
  phone?: number;
  liscenceNo?: number;
  image?: [];
  restaurantType?: string;
  restaurantPhone?: number;
  category?: object;
  menu?: [{}];
  openStatus?:boolean;
}

// An interface that describes the properties
// that a User Model has
interface UserModel extends mongoose.Model<VendorDoc> {
  build(attrs: VendorAttrs): VendorDoc;
}

// An interface that describes the properties
// that a User Document has
export interface VendorDoc extends mongoose.Document {
  _id:string;
  name: string;
  restaurantName: string;
  description: string;
  restaurantAddress: object;
  email: string;
  phone: number;
  liscenceNo: number;
  vendorStatus: boolean;
  image: [];
  restaurantType: string;
  restaurantPhone: number;
  category: object;
  menu: [{}];
  openStatus:boolean;
}

const vendorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      maxlength: 32,
    },
    restaurantName: {
      type: String,
      trim: true,
      maxlength: 32,
    },
    description: {
      type: String,
    },
    restaurantType: String,
    email: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
    },
    phone: {
      type: Number,
      required: true,
      unique: 10,
    },
    restaurantPhone: Number,
    liscenceNo: {
      type: Number,
    },
    vendorStatus: {
      type: Boolean,
      default: false,
    },
    image: Array,
    category: {
      type: [String],
      default: [],
    },
    menu: {
      type: [{}],
      default: [],
    },
    openStatus:{
      type: Boolean,
      default: false,
    },
    address:String,
    state: String,
    pincode: String,
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

vendorSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

vendorSchema.statics.build = (attrs: VendorAttrs) => {
  return new Vendor(attrs);
};

const Vendor = mongoose.model<VendorDoc, UserModel>("Vendor", vendorSchema);

export { Vendor };
