import { Router } from 'express';

import sessionController from './app/controllers/SessionController';
import recipientController from './app/controllers/RecipientController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/sessions', sessionController.store);

routes.use(authMiddleware);

routes.post('/createRecipient', recipientController.store);

routes.put('/updateRecipient', recipientController.update);

export default routes;
