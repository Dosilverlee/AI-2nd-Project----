import joi from "joi";
import { NextFunction, Response } from "express";
import { IRequest } from "user";
import { errorGenerator } from "../errorGenerator";

const errorMessage = {
  stringBase: "문자여야합니다.",
  stringMin: "4글자이상이여야합니다.",
  stringMax: "300글자이하이여야합니다.",
};

const validateSchema = (schema : joi.ObjectSchema, optional = false) => {
    return (req : IRequest, res : Response , next : NextFunction) => {
        const { error } = schema.validate(req.body);
        if (error){
            const errorMessage = error.details[0].message;
        const customError = errorGenerator(errorMessage, 400);
        return res.status(customError.statusCode).json({error:customError.message});
        }
        next();
    }
}

const reviewSchema = joi.object({
  title: joi.string().min(4).messages({
      "string.base": errorMessage.stringBase,
      "string.min": errorMessage.stringMin,
  }),
  content: joi.string().min(4).max(300).messages({
      "string.base": errorMessage.stringBase,
      "string.min": errorMessage.stringMin,
      "string.max": errorMessage.stringMax,
  }),
  location: joi.any(),
  uploadFile: joi.any(),
});

export const postReviewValidator = validateSchema(reviewSchema);

export const putReviewValidator = validateSchema(reviewSchema, true);