import { Orders } from "../models/orders";
import mongoose from "mongoose"
import { Vendor } from "../models/vendor";
import { vendorSignin } from "../controller/vendor-controller";

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



export const getVisitorsCount = () => {
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
            $gte: new Date(new Date().setHours(0, 0, 0, 0)), // Start of day
            $lt: new Date(new Date().setHours(23, 59, 59, 999)), // End of day
          },
        },
      },
      {
        $group: {
          _id: null,
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
        resolve(data[0]?.noOfOrders);
      }
    });
  });
};

export const getMonthlyVisitorsCount = () => {
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
          _id: null,
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
        resolve(data[0]?.noOfOrders);
      }
    });
  });
};


export const getAllVendorMonthlyDataForYear = () => {
  return new Promise((resolve , reject ) => {
    Orders.aggregate([
      {
        $match: {
          "orders.createdAt": {
            $gte: new Date(new Date().getFullYear(), 0, 1),
            $lt: new Date(new Date().getFullYear() + 1, 0, 1),
          },
        },
      },
      {
        $unwind: "$orders",
      },
      {
        $group: {
          _id: {
            restaurantId: "$restaurantId",
            year: { $year: "$orders.createdAt" },
            month: { $month: "$orders.createdAt" },
          },
          noOfOrders: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: { restaurantId: "$_id.restaurantId" },
          monthlySales: {
            $push: {
              month: "$_id.month",
              year: "$_id.year",
              noOfOrders: "$noOfOrders",
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          vendorDetails:1,
          restaurantId: {
            $toObjectId: "$_id.restaurantId" 
          },
          sales: {
            $map: {
              input: { $range: [1, 13] },
              as: "month",
              in: {
                $cond: [
                  { $in: ["$$month", { $map: { input: "$monthlySales", as: "s", in: "$$s.month" } }] },
                  { $first: { $filter: { input: "$monthlySales", as: "s", cond: { $eq: ["$$s.month", "$$month"] } } } },
                  { month: "$$month", year: 0, noOfOrders: 0 },
                ],
              },
            },
          },
        },
      },{
        $lookup: {
          from: "vendors",
          localField: "restaurantId",
          foreignField: "_id",
          as: "vendorDetails"
        }
      },{
        $project: {
          restaurantName: { $arrayElemAt: ["$vendorDetails.restaurantName", 0] },
          restaurantId:1,
          sales:1
        },
      },
    ]).exec((err, data) => {
      if (err) {
        console.log(err); 
        reject(err);
      } else {
        console.log(data);
        
        resolve(data);
      }
    });    
  })
};