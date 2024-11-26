import { successResponse } from "../controllers/responseController.js";
import WishModel from "../models/wishesModel.js";

import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

export const CreateWishService = async (req, res, next) => {
  try {
    let userId = req.headers.userId;
    let reqBody = req.body;
    reqBody.userID = userId;

    const data = await WishModel.create(reqBody);
    return successResponse(res, {
      statusCode: 200,
      message: "Wish Create Successfully",
      payload: data,
    });
  } catch (error) {
    next(error);
  }
};

export const ReadWishListService = async (req, res, next) => {
  try {
    let userId = new ObjectId(req.headers.userId);
    let matchStage = { $match: { userID: userId } };

    let JoinStageProduct = {
      $lookup: {
        from: "products",
        localField: "productID",
        foreignField: "_id",
        as: "product",
      },
    };
    const unwindProduct = { $unwind: "$product" };

    let data = await WishModel.aggregate([
      matchStage,
      JoinStageProduct,
      unwindProduct,
    ]);

    return successResponse(res, {
      statusCode: 200,
      message: "Wish Read Successfully",
      payload: data,
    });
  } catch (error) {
    next(error);
  }
};

export const RemoveWishService = async (req, res, next) => {
  try {
    let userId = new ObjectId(req.headers.userId);
    let reqBody = req.body;

    await WishModel.deleteOne({
      productID: reqBody.id,
      userID: userId,
    });

    return successResponse(res, {
      statusCode: 200,
      message: "Wish Delete Successfully",
    });
  } catch (error) {
    next(error);
  }
};
