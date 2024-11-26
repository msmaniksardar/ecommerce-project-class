import {
    DetailsService,
    ListByBrandService,
    ListByCategoryService, listByFilterService,
    ListByKeywordService,
    ListByRemarkService,
    ReviewListService,
    SliderListService,
} from "../services/ProductServices.js";

export const ProductListByCategory = async (req, res, next) => {
    await ListByCategoryService(req, res, next);
};

export const ProductListByRemark = async (req, res, next) => {
    await ListByRemarkService(req, res, next);
};

export const ProductListByBrand = async (req, res, next) => {
    await ListByBrandService(req, res, next);
};

export const ProductListBySlider = async (req, res, next) => {
    await SliderListService(req, res, next);
};

export const ProductDetailsID = async (req, res, next) => {
    await DetailsService(req, res, next);
};

export const ProductListByKeyword = async (req, res, next) => {
    await ListByKeywordService(req, res, next);
};
export const ReviewList = async (req, res, next) => {
    await ReviewListService(req, res, next);
};
export const productFilterList = async (req, res, next) => {
    await listByFilterService(req, res, next);
};


