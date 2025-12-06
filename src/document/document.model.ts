import { DataTypes } from "sequelize";
import sequelize from "../db/db";


const documentModel = sequelize.define('Document',{ 
    id:{
        type:DataTypes.UUID,
        primaryKey:true,
        defaultValue:DataTypes.UUIDV4
    },
    title:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    content:{
        type:DataTypes.STRING,
        allowNull:false,
    },
   
},{
    timestamps:true,
    tableName:'documents',
   
})

export default documentModel;