import mongoose from "mongoose";
import { Password } from "../services/password";

// An interface that describes the properties
// that are requried to create a new User
interface VendorAttrs {
  id?: string;
  name?: string;
  restaurantName?: string;
  description?: string;
  restaurantAddress?: object;
  email?: string;
  phone?: number;
  vendorStatus?: boolean;
  liscenceNo?: number;
  image?: [];
  restaurantType?: string;
  restaurantPhone?: number;
  category?: object;
  menu?: [{}];
}

// An interface that describes the properties
// that a User Model has
interface UserModel extends mongoose.Model<VendorDoc> {
  save(): unknown;
  build(attrs: VendorAttrs): VendorDoc;
}

// An interface that describes the properties
// that a User Document has
export interface VendorDoc extends mongoose.Document {
  id: string;
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
}

const vendorSchema = new mongoose.Schema(
  {
    vendorId: String,
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
    restaurantAddress: {
      address: String,
      pincode: Number,
      state: String,
    },
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
    workingDays: Object,
    openingTime: Object,
    closingTime: Object,
    image: Array,
    category: {
      type: [String],
      default: [],
    },
    menu: {
      type: [{}],
      default: [],
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
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
