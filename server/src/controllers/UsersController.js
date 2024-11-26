import {CreateReviewService} from "../services/ProductReviewService.js";
import {
    CreateUserProfileService,
    LoginService, logoutUserService,
    ReadUserProfileService,
    UpdateUserProfileService,
    VerifyLoginService,
} from "../services/UserService.js";

export const Login = async (req, res, next) => {
    await LoginService(req, res, next);
};

export const VerifyLogin = async (req, res, next) => {
    await VerifyLoginService(req, res, next);
};

export const CreateUserProfile = async (req, res, next) => {
    await CreateUserProfileService(req, res, next);
};

export const UpdateUserProfile = async (req, res, next) => {
    await UpdateUserProfileService(req, res, next);
};

export const ReadUserProfile = async (req, res, next) => {
    await ReadUserProfileService(req, res, next);
};

export const CreateUserReview = async (req, res, next) => {
    await CreateReviewService(req, res, next);
};

export const UpdateUserReview = async (req, res, next) => {
    await CreateReviewService(req, res, next);
};

export const userLogOut = async (req, res, next) => {
    await logoutUserService(req, res, next);
}