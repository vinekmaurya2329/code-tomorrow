import { Request, Response } from "express";
import subscribeModel from "./subscribe.model";


export const buySubscription = async (req:Request,res:Response)=>{

    const {userId,planId} = req.body;
    if(!userId || !planId){
        return res.status(400).json({error:'User ID and Plan ID are required'});
    }
  const checkActivePlan = await subscribeModel.findOne({where:{userId,planId,isActive:true}});
  if(checkActivePlan){ 
    return res.status(400).json({error:'User already has an active subscription for this plan'});
  }

    const buy = await subscribeModel.create({userId,planId});
    return res.status(201).json({
        message:'Subscription purchased successfully',
        success:true
    });
}