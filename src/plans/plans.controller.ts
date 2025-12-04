import { Request, Response } from "express";
import planModel from "./plans.model";
import { Op } from "sequelize";

export const createPlan = async (req:Request,res:Response)=>{
  const {name,monthlyQuota,extraChargePerUnit } = req.body;
    if(!name || !monthlyQuota || !extraChargePerUnit){
        return res.status(400).json({error:'Name, Monthly Quota and Extra Charge Per Unit are required'});
    }
   const checkExisting  = await planModel.findOne({where:{name:{[Op.iLike]:`%${name}%`}}})
   if (checkExisting) {
    return res.status(400).json({ error: 'A plan with this name already exists' });
   }
    const plan = await planModel.create({name,monthlyQuota,extraChargePerUnit});
    return res.status(201).json({
        message:'Plan created successfully',
        success:true
    });
}