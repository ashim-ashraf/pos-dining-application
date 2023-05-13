import mongoose from "mongoose";
import { natsWrapper } from "./nats-wrapper";
import { app } from "./app";
import { TableBookedListener } from "./events/listeners/table-booked-listener";
import { OrderCreatedListener } from "./events/listeners/order-created-listener";
import { OrderItemCancelledListener } from "./events/listeners/order-cancelled-listener";
import { OrderPaymentUpdateListener } from "./events/listeners/order-payment-listener";


const start = async () => {
  console.log("Vendor service connecting....");

  if (!process.env.JWT_VENDOR_KEY) {
    throw new Error("JWT_VENDOR_KEY must be defined");
  }
  if (!process.env.JWT_ADMIN_KEY) {
    throw new Error("JWT_ADMIN_KEY must be defined");
  }
  if (!process.env.ADMIN_PASSWORD) {
    throw new Error("ADMIN_PASSWORD must be defined");
  }
  if (!process.env.ADMIN_USERNAME) {
    throw new Error("ADMIN_USERNAME must be defined");
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

    new TableBookedListener(natsWrapper.client).listen();
    new OrderCreatedListener(natsWrapper.client).listen();
    new OrderItemCancelledListener(natsWrapper.client).listen();
    new OrderPaymentUpdateListener(natsWrapper.client).listen();


    await mongoose.connect(process.env.MONGO_URI, {
      dbName:'pos-vendor',
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false 
    });
    console.log("Connected to MongoDb");
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log("Listening on port 3000!!!!!!!!");
  });
};

start();
