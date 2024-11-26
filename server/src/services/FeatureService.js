import {successResponse} from "../controllers/responseController.js";
import FeaturesModel from "../models/FeaturesModel.js";
import termsModel from "../models/termsModel.js";

export const createFeatureService = async (req, res, next) => {
    try {
        const reqBody = req.body;
        const data = await FeaturesModel.create(reqBody);
        return successResponse(res, {
            statusCode: 200,
            message: "Successfully created",
            payload: data,
        })
    } catch (error) {
        next(error)
    }
}

export const readFeatureService = async (req, res, next) => {
    try {
        const data = await FeaturesModel.find();
        return successResponse(res, {
            statusCode: 200,
            message: "Read Features successfully",
            payload: data
        })
    } catch (error) {
        next(error)
    }
}

export const deleteFeatureService = async (req,res,next) => {
    try{
        const reqParams = req.params;
        await FeaturesModel.deleteOne({_id:reqParams.id});
        return successResponse(res, {
            statusCode: 200,
            message: "Successfully deleted",
        })
    }catch(error){
        next(error);
    }
}

export const termsAndConditionService = async (req, res, next) => {
    try{
        const type = req.params.type;
        const data = await  termsModel.find({type:type});
        return successResponse(res, {
            statusCode: 200,
            message: "Successfully terms",
            payload: data
        })
    }catch(error){
        next(error);
    }
}