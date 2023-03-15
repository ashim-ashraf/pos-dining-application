import mongoose from "mongoose";
import { Password } from "../services/password";

// An interface that describes the properties
// that are requried to create a new User
interface VendorAttrs {
  name: string;
  email: string;
  phone: number;
  password: string;
}

// An interface that describes the properties
// that a User Model has
interface UserModel extends mongoose.Model<VendorDoc> {
  build(attrs: VendorAttrs): VendorDoc;
}

// An interface that describes the properties
// that a User Document has
interface VendorDoc extends mongoose.Document {
  email: string;
  password: string;
  isAdmin: boolean;
}

const vendorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: 32,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
      unique: 10,
    },
    isAdmin: {
      type: Boolean,
      default: true,
    },
    Coupons: Array,
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
