import { CategoryListService } from "../services/ProductServices.js";

export const CategoryList = async (req, res, next) => {
  await CategoryListService(req, res, next);
};
