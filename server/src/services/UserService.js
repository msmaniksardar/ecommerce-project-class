import createHttpError from "http-errors";
import { sendEmail } from "../utility/emailUtility.js";
import {errorResponse, successResponse} from "./../controllers/responseController.js";
import UserModel from "./../models/usersModel.js";
import { tokenEncode } from "../utility/tokenUtility.js";
import ProfileModel from "./../models/profilesModel.js";

export const LoginService = async (req, res, next) => {
  try {
    let { email } = req.body;
    let code = Math.floor(100000 + Math.random() * 900000);
    let EmailTo = email;
    let EmailText = `Your Verification Code is= ${code}`;
    let EmailSubject = "Email Verification";

    sendEmail(EmailTo, EmailSubject, EmailText);

    await UserModel.updateOne(
      { email: email },
      { $set: { otp: code } },
      { upsert: true }
    );

    return successResponse(res, {
      statusCode: 200,
      message: "CHECK YOUR EMAIL ADDRESS.WE SENT A 6 DIGIT VERIFICATION CODE ",
    });
  } catch (error) {
    next(error);
  }
};

export const VerifyLoginService = async (req, res, next) => {
  try {
    let { otp } = req.body;
    let user = await UserModel.findOne({ otp: otp });
    if (!user) {
      return  errorResponse( res, {
        statusCode: 200,
        message: "Invalid OTP",
      })
    }
    let token = tokenEncode({ user });

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "None",
      secure:true,
      maxAge: 30 * 24 * 60 * 60 * 1000, // Cookie expires in 30 day
    });
    let code = Math.floor(100000 + Math.random() * 900000);
    await UserModel.updateOne({ otp: otp }, { $set: { otp: code } });
    return successResponse(res, {
      statusCode: 200,
      message: "VERIFY SUCCESSFULLY",
      payload: token,
    });
  } catch (error) {
    next(error);
  }
};

export const CreateUserProfileService = async (req, res, next) => {
  try {
    let userId = req.headers.userId;
    console.log(userId);
    let reqBody = req.body;
    reqBody.userID = userId;
    const data = await ProfileModel.updateOne(
      { userID: userId },
      { $set: reqBody },
      { upsert: true }
    );
    return successResponse(res, {
      statusCode: 200,
      message: "SUCCESSFULLY CREATE PROFILE DETAILS ",
      payload: data,
    });
  } catch (e) {
    next(error);
  }
};

export const UpdateUserProfileService = async (req, res, next) => {
  try {
    let userId = req.headers.userId;
    console.log(userId);
    let reqBody = req.body;
    reqBody.userID = userId;
    const data = await ProfileModel.updateOne(
      { userID: userId },
      { $set: reqBody },
      { upsert: true }
    );
    return successResponse(res, {
      statusCode: 200,
      message: "SUCCESSFULLY UPDATE PROFILE DETAILS ",
      payload: data,
    });
  } catch (e) {
    next(error);
  }
};

export const ReadUserProfileService = async (req, res, next) => {
  try {
    let userId = req.headers.userId;
    let data = await ProfileModel.findOne({ userID: userId });
    return successResponse(res, {
      statusCode: 200,
      message: "SUCCESSFULLY READ PROFILE DETAILS ",
      payload: data,
    });
  } catch (e) {
    return { status: "fail", message: "Something Went Wrong" };
  }
};

export const logoutUserService = async (req, res, next) => {
  try {
    res.clearCookie("token");
    return successResponse(res, {
      statusCode: 200,
      message:"User logOut Successfully",
    })
  }catch (error){
    next(error)
  }
}