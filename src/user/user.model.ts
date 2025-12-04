import { DataTypes } from "sequelize";
import sequelize from "../db/db";
import subscribeModel from "../subscriptions/subscribe.model";
import planModel from "../plans/plans.model";


const userModel = sequelize.define('User',{
    id:{
        type: DataTypes.UUID,
        primaryKey:true,
        defaultValue: DataTypes.UUIDV4
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{
    timestamps:true,
    tableName:'users'
})
subscribeModel.belongsTo(userModel,{foreignKey:'userId',as:'users'});
userModel.hasOne(subscribeModel,{foreignKey:'userId',as:'subscriptions'});

planModel.hasMany(subscribeModel,{foreignKey:'planId',as:'subscriptions'});
subscribeModel.belongsTo(planModel,{foreignKey:'planId',as:'plans'});
export default userModel;