import { BrandListService } from "../services/ProductServices.js";

export const BrandList = async (req, res, next) => {
  await BrandListService(req, res, next);
};
