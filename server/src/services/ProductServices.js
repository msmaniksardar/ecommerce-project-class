import mongoose from "mongoose";
import {successResponse} from "./../controllers/responseController.js";
import BrandModel from "./../models/brandsModel.js";
import CategoryModel from "./../models/categoriesModel.js";
import ProductSliderModel from "./../models/slidersModel.js";
import ProductModel from "./../models/productsModel.js";
import createHttpError from "http-errors";
import ReviewModel from "../models/reviewsModel.js";

const ObjectId = mongoose.Types.ObjectId;

export const BrandListService = async (req, res, next) => {
    try {
        const data = await BrandModel.aggregate([{$match: {}}]);
        successResponse(res, {
            statusCode: 200,
            message: "SUCCESSFULLY RETURN ALL BRAND LIST",
            payload: data,
        });
    } catch (error) {
        next(error);
    }
};

export const CategoryListService = async (req, res, next) => {
    try {
        const data = await CategoryModel.aggregate([{$match: {}}]);
        successResponse(res, {
            statusCode: 200,
            message: "SUCCESSFULLY RETURN ALL CATEGORIES",
            payload: data,
        });
    } catch (error) {
        next(error);
    }
};

export const SliderListService = async (req, res, next) => {
    try {
        const joinWithProductStage = {
            $lookup: {
                from: "products",
                localField: "productID",
                foreignField: "_id",
                as: "product",
            },
        };
        const unwindProduct = {$unwind: "$product"};
        const data = await ProductSliderModel.aggregate([
            joinWithProductStage,
            unwindProduct,
        ]);
        successResponse(res, {
            statusCode: 200,
            message: "SUCCESSFULLY RETURN ALL PRODUCT SLIDER",
            payload: data,
        });
    } catch (error) {
        next(error);
    }
};

export const ListByBrandService = async (req, res, next) => {
    try {
        const BrandID = new ObjectId(req.params.BrandID); // Corrected from req.Params to req.params
        const matchStage = {$match: {brandID: BrandID}};

        const joinWithBrandStage = {
            $lookup: {
                from: "brands",
                localField: "brandID",
                foreignField: "_id",
                as: "brand",
            },
        };
        const joinWithBCategoryStage = {
            $lookup: {
                from: "categories",
                localField: "categoryID",
                foreignField: "_id",
                as: "category",
            },
        };

        const unwindBrand = {$unwind: "$brand"};
        const unwindCategory = {$unwind: "$category"};
        let ProjectionStage = {
            $project: {
                "brand._id": 0,
                "category._id": 0,
                categoryID: 0,
                brandID: 0,
            },
        };
        const data = await ProductModel.aggregate([
            matchStage,
            joinWithBrandStage,
            joinWithBCategoryStage,
            unwindBrand,
            unwindCategory,
            ProjectionStage,
        ]);

        successResponse(res, {
            statusCode: 200,
            message: "success",
            payload: data,
        });
    } catch (error) {
        next(error);
    }
};

export const ListByCategoryService = async (req, res, next) => {
    try {
        const CategoryID = new ObjectId(req.params.CategoryID); // Corrected from req.Params to req.params
        const matchStage = {$match: {categoryID: CategoryID}};

        const joinWithBrandStage = {
            $lookup: {
                from: "brands",
                localField: "brandID",
                foreignField: "_id",
                as: "brand",
            },
        };
        const joinWithBCategoryStage = {
            $lookup: {
                from: "categories",
                localField: "categoryID",
                foreignField: "_id",
                as: "category",
            },
        };

        const unwindBrand = {$unwind: "$brand"};
        const unwindCategory = {$unwind: "$category"};
        let ProjectionStage = {
            $project: {
                "brand._id": 0,
                "category._id": 0,
                categoryID: 0,
                brandID: 0,
            },
        };
        const data = await ProductModel.aggregate([
            matchStage,
            joinWithBrandStage,
            joinWithBCategoryStage,
            unwindBrand,
            unwindCategory,
            ProjectionStage,
        ]);

        successResponse(res, {
            statusCode: 200,
            message: "success",
            payload: data,
        });
    } catch (error) {
        next(error);
    }
};

export const ListByRemarkService = async (req, res, next) => {
    try {
        const Remark = req.params.Remark;
        const matchStage = {$match: {remark: Remark}};

        const joinWithBrandStage = {
            $lookup: {
                from: "brands",
                localField: "brandID",
                foreignField: "_id",
                as: "brand",
            },
        };
        const joinWithBCategoryStage = {
            $lookup: {
                from: "categories",
                localField: "categoryID",
                foreignField: "_id",
                as: "category",
            },
        };

        const unwindBrand = {$unwind: "$brand"};
        const unwindCategory = {$unwind: "$category"};
        let ProjectionStage = {
            $project: {
                "brand._id": 0,
                "category._id": 0,
                categoryID: 0,
                brandID: 0,
            },
        };
        const data = await ProductModel.aggregate([
            matchStage,
            joinWithBrandStage,
            joinWithBCategoryStage,
            unwindBrand,
            unwindCategory,
            ProjectionStage,
        ]);

        successResponse(res, {
            statusCode: 200,
            message: "PRODUCT LIST BY REMARK",
            payload: data,
        });
    } catch (error) {
        next(error);
    }
};

export const DetailsService = async (req, res, next) => {
    try {
        let ProductID = new ObjectId(req.params.ProductID);
        let MatchStage = {$match: {_id: ProductID}};
        let JoinWithBrandStage = {
            $lookup: {
                from: "brands",
                localField: "brandID",
                foreignField: "_id",
                as: "brand",
            },
        };
        let JoinWithCategoryStage = {
            $lookup: {
                from: "categories",
                localField: "categoryID",
                foreignField: "_id",
                as: "category",
            },
        };
        let JoinWithDetailsStage = {
            $lookup: {
                from: "productdetails",
                localField: "_id",
                foreignField: "productID",
                as: "details",
            },
        };

        let UnwindBrandStage = {$unwind: "$brand"};
        let UnwindCategoryStage = {$unwind: "$category"};
        let UnwindDetailsStage = {$unwind: "$details"};

        let ProjectionStage = {
            $project: {
                "brand._id": 0,
                "category._id": 0,
                categoryID: 0,
                brandID: 0,
            },
        };

        let data = await ProductModel.aggregate([
            MatchStage,
            JoinWithBrandStage,
            JoinWithCategoryStage,
            JoinWithDetailsStage,
            UnwindBrandStage,
            UnwindCategoryStage,
            UnwindDetailsStage,
            ProjectionStage,
        ]);
        return successResponse(res, {
            statusCode: 200,
            message: "success",
            payload: data,
        });
    } catch (error) {
        next(error);
    }
};

export const ListByKeywordService = async (req, res, next) => {
    try {
        let SearchRegex = {"$regex": req.params.keyword, "$options": "i"}
        let SearchParams = [{title: SearchRegex}, {shortDes: SearchRegex}]
        let SearchQuery = {$or: SearchParams}

        let MatchStage = {$match: SearchQuery}
        let JoinWithBrandStage = {
            $lookup: {
                from: "brands",
                localField: "brandID",
                foreignField: "_id",
                as: "brand",
            },
        };
        let JoinWithCategoryStage = {
            $lookup: {
                from: "categories",
                localField: "categoryID",
                foreignField: "_id",
                as: "category",
            },
        };
        let JoinWithDetailsStage = {
            $lookup: {
                from: "productdetails",
                localField: "_id",
                foreignField: "productID",
                as: "details",
            },
        };

        let UnwindBrandStage = {$unwind: "$brand"};
        let UnwindCategoryStage = {$unwind: "$category"};
        let UnwindDetailsStage = {$unwind: "$details"};

        let ProjectionStage = {
            $project: {
                "brand._id": 0,
                "category._id": 0,
                categoryID: 0,
                brandID: 0,
            },
        };

        let data = await ProductModel.aggregate([
            MatchStage,
            JoinWithBrandStage,
            JoinWithCategoryStage,
            JoinWithDetailsStage,
            UnwindBrandStage,
            UnwindCategoryStage,
            UnwindDetailsStage,
            ProjectionStage,
        ]);
        return successResponse(res, {
            statusCode: 200,
            message: "success",
            payload: data,
        });
    } catch (error) {
        next(error);
    }
};

export const ReviewListService = async (req, res, next) => {
    try {
        let ProductID = new ObjectId(req.params.ProductID);
        let MatchStage = {$match: {productID: ProductID}};

        let JoinWithProfileStage = {
            $lookup: {
                from: "profiles",
                localField: "userID",
                foreignField: "userID",
                as: "profile",
            },
        };
        let UnwindProfileStage = {$unwind: "$profile"};
        let ProjectionStage = {
            $project: {des: 1, rating: 1, "profile.cus_name": 1},
        };

        let data = await ReviewModel.aggregate([
            MatchStage,
            JoinWithProfileStage,
            UnwindProfileStage,
            //   ProjectionStage,
        ]);
        successResponse(res, {
            statusCode: 200,
            message: "success",
            payload: data,
        });
    } catch (error) {
        next(error);
    }
};


export const listByFilterService = async (req, res, next) => {
    try {
        let matchConditions = {};
        let categoryId =  new ObjectId(req.body.categoryID);
        let brandId =  new ObjectId(req.body.brandID);

        if (req.body.categoryID) {
            matchConditions.categoryID = categoryId;
        }
        if (req.body.brandID) {
            matchConditions.brandID = brandId;
        }
        let MatchStage = { $match: matchConditions };



        let AddFieldsStage = {
            $addFields: { numericPrice: { $toInt: "$price" }}
        };

        let PriceMatchConditions = {};

        let priceMin = parseInt(req.body.priceMin);
        let priceMax = parseInt(req.body.priceMax);

        if (!isNaN(priceMin)) {
            PriceMatchConditions['numericPrice'] = { $gte: priceMin };
        }
        if (!isNaN(priceMax)) {
            PriceMatchConditions['numericPrice'] = { ...(PriceMatchConditions['numericPrice'] || {}), $lte: priceMax };
        }
        let PriceMatchStage = { $match: PriceMatchConditions };




        let JoinWithBrandStage= {$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}};
        let JoinWithCategoryStage={$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}};
        let UnwindBrandStage={$unwind:"$brand"}
        let UnwindCategoryStage={$unwind:"$category"}
        let ProjectionStage={$project:{'brand._id':0,'category._id':0,'categoryID':0,'brandID':0}}



        let data= await  ProductModel.aggregate([

            MatchStage,
            AddFieldsStage,
            PriceMatchStage,
            JoinWithBrandStage,JoinWithCategoryStage,
            UnwindBrandStage,UnwindCategoryStage, ProjectionStage
        ])
        return successResponse(res, {
            statusCode: 200,
            message:"Product Filter Success",
            payload: data,
        })

    } catch (e) {
        next(e)
    }
}
