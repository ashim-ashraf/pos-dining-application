import mongoose from "mongoose";
import { app } from "./app";
import { natsWrapper } from "./nats-wrapper";
import { VendorPublishedListener } from "./events/listener/vendor-publlished-listener";
import { TableCreatedListener } from "./events/listener/table-created-listener";
import { OrderStatusUpdateListener } from "./events/listener/order-status-update-listener";
import { VendorApprovalListener } from "./events/listener/vendor-approval-listener";
import { VendorOpenStatusListener } from "./events/listener/vendor-openstatus-listener";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be defined");
  }
  if (!process.env.NATS_URL) {
    throw new Error("NATS_URL must be defined");
  }
  if (!process.env.NATS_CLIENT_ID) {
    throw new Error("NATS_CLIENT_ID must be defined");
  }
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error("NATS_CLUSTER_ID must be defined");
  }

  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );
    natsWrapper.client.on("close", () => {
      console.log("NATS connection closed!");
      process.exit();
    });
    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());

    new VendorPublishedListener(natsWrapper.client).listen();
    new TableCreatedListener(natsWrapper.client).listen();
    new OrderStatusUpdateListener(natsWrapper.client).listen();
    new VendorApprovalListener(natsWrapper.client).listen();
    new VendorOpenStatusListener(natsWrapper.client).listen();

    await mongoose.connect(process.env.MONGO_URI, {
      dbName:'pos',
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log("Connected to MongoDb");
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log("Listening on port 3000");
  });
}

start();
