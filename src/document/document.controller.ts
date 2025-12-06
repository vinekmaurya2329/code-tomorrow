import { Response } from "express";
import documentModel from "./document.model";
import { Op } from "sequelize";


export const searchDocument = async (req:any,res:Response)=>{
 const {query} = req.query;
 console.log(query);
 const file = await documentModel.findAll({
    where: {
      title: {
        [Op.iLike]: `%${query}%`  
      }
    }
  });

//   if(file.length === 0){
//     return res.status().json({message:'No documents found'});
//   }
    return res.status(200).json({
        message:'Documents fetched successfully',
        success:true,
        data:file
    });
}