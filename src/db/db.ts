import { Sequelize } from "sequelize";
import subscribeModel from "../subscriptions/subscribe.model";
import userModel from "../user/user.model";

const {DB_NAME,DB_USER,DB_PASSWORD,DB_HOST} = process.env
const sequelize = new Sequelize(DB_NAME,DB_USER,DB_PASSWORD,{
    host:DB_HOST,
    dialect:'postgres',
    logging:true
})

sequelize.authenticate().then(()=>{
    sequelize.sync({alter:true})
  

    console.log('Database connected');
}).catch((error)=>{
    console.log('Unable to connect to the database:',error);
})
export default sequelize;