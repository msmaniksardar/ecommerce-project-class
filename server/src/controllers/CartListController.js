import {
  CreateCartService,
  ReadCartService,
  RemoveCartService,
  UpdateCartService,
} from "../services/CartService.js";

export const CreateCart = async (req, res, next) => {
  await CreateCartService(req, res, next);
};

export const ReadCartList = async (req, res, next) => {
  await ReadCartService(req, res, next);
};

export const RemoveCart = async (req, res, next) => {
  await RemoveCartService(req, res, next);
};

export const UpdateCart = async (req, res, next) => {
  await UpdateCartService(req, res, next);
};
