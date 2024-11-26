import { successResponse } from "../controllers/responseController.js";
import ReviewModel from "../models/reviewsModel.js";

export const CreateReviewService = async (req, res, next) => {
  try {
    let userId = req.headers.userId;
    let reqBody = req.body;

    let data = await ReviewModel.findOneAndUpdate(
      { userID: userId, productID: reqBody.productID },
      reqBody,
      { upsert: true }
    );

    return successResponse(res, {
      statusCode: 201,
      message: "success",
      payload: data,
    });
  } catch (error) {
    next(error);
  }
};
