import mongoose from "mongoose";
import CartModel from "../models/cartsModel.js";
import { successResponse } from "../controllers/responseController.js";
import createHttpError from "http-errors";

const ObjectId = mongoose.Types.ObjectId;

export const CreateCartService = async (req, res, next) => {
  try {
    let userId = req.headers.userId;
    let reqBody = req.body;
    reqBody.userID = userId;

    const data = await CartModel.create(reqBody);
    return successResponse(res, {
      statusCode: 200,
      message: "Cart Create Successfully",
      payload: data,
    });
  } catch (error) {
    next(error);
  }
};

export const ReadCartService = async (req, res, next) => {
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
    let unwindProduct = { $unwind: "$product" };

    let data = await CartModel.aggregate([matchStage, JoinStageProduct , unwindProduct]);

    return successResponse(res, {
      statusCode: 200,
      message: "Cart Reads Successfully",
      payload: data,
    });
  } catch (error) {
    next(error);
  }
};

export const RemoveCartService = async (req, res, next) => {
  try {
    let userId = req.headers["userId"];
    let id = new ObjectId(req.body.id);
    let data = await CartModel.deleteOne({ _id: id, userID: userId });
    return successResponse(res, {
      statusCode: 200,
      message: "Cart Create Successfully",
      payload: data.id,
    });
  } catch (error) {
    next(error);
  }
};

export const UpdateCartService = async (req, res, next) => {
  try {
    let userId = req.headers.userId;
    let reqBody = req.body;
    let id = new ObjectId(req.body.id);
    const cart = await CartModel.findById({ _id: id });
    if (!cart) {
      return next(createHttpError(404, "Failed To find Cart With This Id "));
    }

    let data = await CartModel.findOneAndUpdate(
      { userID: userId, _id: reqBody.id },
      reqBody,
      { new: true }
    );

    return successResponse(res, {
      statusCode: 200,
      message: "Cart Update Successfully",
      payload: data,
    });
  } catch (error) {
    next(error);
  }
};
