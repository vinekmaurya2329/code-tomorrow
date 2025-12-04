
import  {Router} from 'express';
import { createUser } from './user.controller';
import { billingSummary, findLastMonthUsage } from '../usage/usage.controller';

const userRouter = Router();

userRouter.post('/create',createUser)
userRouter.get('/:id/current-usage',findLastMonthUsage)
userRouter.get('/:id/billing-summary',billingSummary)
export default userRouter;