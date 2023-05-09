import { Orders } from "../models/orders";

export const getCurrentDayData = (restaurantId: String) => {
  return new Promise((resolve, reject) => {
    Orders.aggregate([
      {
        $match: {
          restaurantId: restaurantId,
        },
      },
      {
        $unwind: "$orders",
      },
      {
        $match: {
          "orders.createdAt": {
            $gte: new Date(new Date().setHours(0, 0, 0, 0)), // Start of day
            $lt: new Date(new Date().setHours(23, 59, 59, 999)), // End of day
          },
        },
      },
      {
        $group: {
          _id: "$restaurantId",
          noOfOrders: {
            $sum: 1,
          },
          totalAmount: {
            $sum: "$orders.totalAmount",
          },
        },
      },
    ]).exec((err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data[0]);
      }
    });
  });
};


  

export const getCurrentMonthData = (restaurantId: String) => {
  return new Promise((resolve, reject) => {
    Orders.aggregate([
      {
        $match: {
          restaurantId: restaurantId,
        },
      },
      {
        $unwind: "$orders",
      },
      {
        $match: {
          "orders.createdAt": {
            $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
            $lt: new Date(
              new Date().getFullYear(),
              new Date().getMonth() + 1,
              0,
              23,
              59,
              59,
              999
            ),
          },
        },
      },
      {
        $group: {
          _id: "$restaurantId",
          noOfOrders: {
            $sum: 1,
          },
          totalAmount: {
            $sum: "$orders.totalAmount",
          },
        },
      },
    ]).exec((err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data[0]);
      }
    });
  });
};

