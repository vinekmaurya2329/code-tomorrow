
import  {Router} from 'express';
import { buySubscription } from './subscription.controller';



const subscriptionRouter = Router();

subscriptionRouter.post('/create',buySubscription)

export default subscriptionRouter;