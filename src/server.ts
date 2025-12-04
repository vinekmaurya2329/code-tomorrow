import express from 'express';

require('dotenv').config();

import userRouter from './user/user.router';
import planRouter from './plans/plans.router';
import subscriptionRouter from './subscriptions/subscription.router';
import usageRouter from './usage/usage.router';

const app = express();
require('./db/db')

app.use(express.json())

app.use('/api/v1/user',userRouter)
app.use('/api/v1/plan',planRouter)
app.use('/api/v1/subscription',subscriptionRouter)
app.use('/api/v1/usage',usageRouter)




app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})