import { Orders } from "../models/orders";
import mongoose from "mongoose"
import { Vendor } from "../models/vendor";

export const getTopSeller = () => {
  return new Promise((resolve, reject) => {
    Orders.aggregate([
      {
        $match: {},
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
          totalOrders: { $sum: 1 },
          totalAmount: { $sum: "$orders.totalAmount" },
        },
      },
      {
        $sort: {
          totalOrders: -1
        }
      },
      {
        $limit: 1
      },
      {
        $lookup: {
          from: "vendors",
          localField: "_id",
          foreignField: "_id",
          as: "restaurant"
        }
      },
    ]).exec(async(err, data) => {
      if (err) {
        reject(err);
      } else {
        const topSeller = data[0]
        const vendor = await Vendor.findById(topSeller._id)
        topSeller.restaurantName = vendor?.restaurantName.trim().split(" ")[0]
        resolve(topSeller);
      }
    });
  });
};

export const getTopRatedDish = () => {
    return new Promise((resolve, reject) => {
       
      });
};

export const getVisitorsCount = () => {
  return new Promise((resolve, reject) => {});
};

export const getMonthlyVisitorsCount = () => {
  return new Promise((resolve, reject) => {});
};


// {
//     $group: {
//       _id: "$orders.items.name",
//       totalQuantity: { $sum: "$orders.items.quantity" },
//     },
//   },
//   {
//     $sort: {
//       totalQuantity: -1,
//     },
//   },
//   {
//     $limit: 1,
//   },