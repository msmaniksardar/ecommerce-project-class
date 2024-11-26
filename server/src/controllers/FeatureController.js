
import {
    createFeatureService,
    deleteFeatureService,
    readFeatureService,
    termsAndConditionService
} from "../services/FeatureService.js";


export const createFeature = async (req, res, next) => {
    await  createFeatureService(req,res,next);
}

export const readFeature = async (req, res, next) => {
    await  readFeatureService(req,res,next);
}

export const deleteFeature = async (req,res,next) => {
    await  deleteFeatureService(req,res,next);
}

export const termsAndCondition = async (req,res,next) => {
    await  termsAndConditionService(req,res,next);
}