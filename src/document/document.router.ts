
import  {Router} from 'express';
import { searchDocument } from './document.controller';




const documentRouter = Router();

documentRouter.get('/search',searchDocument)

export default documentRouter;