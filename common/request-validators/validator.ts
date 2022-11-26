import { NextFunction, Request, Response } from "express";
import Joi, { ObjectSchema } from "joi";
import { HttpStatusCode } from "../enums/httpStatuses.enum";

export const validateor = (schema: ObjectSchema) =>{
    return async (req: Request, res: Response, next: NextFunction )=>{
        //on this function we handle req body and validate it according to the schema tha passed on parent
        try{
            await schema.validate(req.body) //is this pass will go to the next middleware
            next()
        }catch(err){
            console.log(err);
            res.status(HttpStatusCode.FORBIDDEN).json({err});
        }
    }
}