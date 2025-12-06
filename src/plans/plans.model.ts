import { DataTypes } from "sequelize";
import sequelize from "../db/db";


const planModel = sequelize.define('Plan',{
    id:{
        type:DataTypes.UUID,
        primaryKey:true,
        defaultValue:DataTypes.UUIDV4
    },
    monthlyQuota :{
        type:DataTypes.INTEGER,
        allowNull:false

    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
        
    },
    extraChargePerUnit :{
        type:DataTypes.DECIMAL(10,2),
        allowNull:false
    }
},{
    timestamps:true,
    tableName:'plans',
    indexes:[
        {fields:['name']},
        {fields:['monthlyQuota']}
    ]
})

export default planModel;