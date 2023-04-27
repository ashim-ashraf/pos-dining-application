import mongoose from "mongoose";

interface BannerAttrs {
  title: string;
  url: string;
  image: string;
}

interface BannerDoc extends mongoose.Document {
  title: string;
  url: string;
  image: string;
}

interface BannerModel extends mongoose.Model<BannerDoc> {
  build(attrs: BannerAttrs): BannerDoc;
}

const bannerSchema = new mongoose.Schema(
  {
    title: String,
    url: String,
    image: String,
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

bannerSchema.statics.build = (attrs: BannerAttrs) => {
  return new Banner(attrs);
};

const Banner = mongoose.model<BannerDoc, BannerModel>("Banner", bannerSchema);

export { Banner };
