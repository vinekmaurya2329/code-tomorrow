import { DataTypes } from "sequelize";
import sequelize from "../db/db";
import userModel from "../user/user.model";


const usageModel = sequelize.define('Usage',{
    id:{
        type:DataTypes.UUID,
        primaryKey:true,
        defaultValue:DataTypes.UUIDV4
    },
    usedUnits:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    action:{
        type:DataTypes.STRING,
        allowNull:true
    }
},{
    timestamps:true,
    tableName:'usages'
})

userModel.hasMany(usageModel,{foreignKey:'userId',as:'usages'});
usageModel.belongsTo(userModel,{foreignKey:'userId',as:'users'});

export default usageModel;