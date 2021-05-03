import { Router } from 'express';
import UserController from '@controllers/UserController';
import authMiddleware from '@middlewares/authMiddleware';

const routes = Router();

routes.post('/user', UserController.store);
routes.post('/auth', UserController.authenticate);
routes.get('/users', authMiddleware, UserController.index);

export default routes;
