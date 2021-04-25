import { Router } from 'express';
import UserController from '@controllers/UserController';

const routes = Router();

routes.post('/users', UserController.store);
routes.post('/auth', UserController.authenticate);

export default routes;
