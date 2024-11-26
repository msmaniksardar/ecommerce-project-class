import {
  CreateWishService,
  ReadWishListService,
  RemoveWishService,
} from "../services/WishService.js";

export const CreateWish = async (req, res, next) => {
  await CreateWishService(req, res, next);
};

export const ReadWishList = async (req, res, next) => {
  await ReadWishListService(req, res, next);
};

export const RemoveWish = async (req, res, next) => {
  await RemoveWishService(req, res, next);
};
