
import  {Router} from 'express';
import { createPlan } from './plans.controller';


const planRouter = Router();

planRouter.post('/create',createPlan)


export default planRouter;