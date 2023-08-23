import { Request, Response, NextFunction } from "express";
import { ILike } from "likes";
import { LikeModel } from "../db/schemas/likeSchema";
import { IRequest } from "user";
import { updateLikeCount } from "../services/likeService";

const toggleLike = async (req : IRequest, res : Response, next : NextFunction) => {
    try{
        const userId = req.user._id;
        console.log(req.body);
        const { targetType, targetId } = req.body;

        const existingLike : ILike | null = await LikeModel.findOne({userId, targetType, targetId });

        if(existingLike){
            await existingLike.deleteOne({ _id : existingLike._id});

            await updateLikeCount(targetType, targetId, -1);

            return res.status(200).json({message : 'Like removed'});
        }else{
            const newLike = new LikeModel({ userId, targetType, targetId });
            await newLike.save();

            await updateLikeCount(targetType, targetId, 1);
            return res.status(201).json({message : 'Like added'});
        }
    }catch(err){
        next(err);
    }

    
}

export { toggleLike };