import { Request, Response } from "express";
import userModel from "./user.model";

export const createUser = async (req:Request,res:Response)=>{
    const {name} = req.body;
    if(!name){
        return  res.status(400).json({error:'Name is required'});
    }
    const user = await userModel.create({name});

    return res.status(201).json(user);
}