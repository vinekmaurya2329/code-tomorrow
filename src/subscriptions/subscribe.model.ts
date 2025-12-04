import { DataTypes } from "sequelize";
import sequelize from "../db/db";



const subscribeModel =  sequelize.define('Subscription',{
    id:{
        type:DataTypes.UUID,
        primaryKey:true,
        defaultValue:DataTypes.UUIDV4
    },
    startDate:{
        type:DataTypes.STRING,
        defaultValue: new Date().toISOString(),
        allowNull:false
    },
    isActive:{
        type:DataTypes.BOOLEAN,
        defaultValue:true
    }
},{
    timestamps:true,
    tableName:'subscriptions'
})


export default subscribeModel;