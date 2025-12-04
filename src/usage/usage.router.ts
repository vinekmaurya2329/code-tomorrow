
import  {Router} from 'express';
import { createUsage } from './usage.controller';




const usageRouter = Router();

usageRouter.post('/create',createUsage)

export default usageRouter;